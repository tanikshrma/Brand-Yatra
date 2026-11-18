import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateContactPayload } from './src/data/contact.ts';
import { SERVICES_LIST } from './src/data/services.ts';
import { PROJECTS_DATA } from './src/data/projects.ts';
import { getPublishedArticles } from './src/data/articles.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

/* ---------------------------------------------------------------------------
   In-Memory Per-IP Rate Limiter for POST /api/contact (Max 5 per 10 minutes)
   --------------------------------------------------------------------------- */
interface RateBucket {
  count: number;
  resetAt: number;
}

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const ipBuckets = new Map<string, RateBucket>();

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = ipBuckets.get(ip);

  if (!existing || existing.resetAt <= now) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  return false;
}

/* Periodically prune expired rate-limit buckets */
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of ipBuckets.entries()) {
    if (bucket.resetAt <= now) {
      ipBuckets.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isPlaceholderEnvValue(val: string | undefined): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  if (!trimmed) return true;
  const upper = trimmed.toUpperCase();
  return (
    upper.startsWith('YOUR_') ||
    upper.startsWith('MY_') ||
    upper === 'REPLACE_ME' ||
    upper.includes('XXXX')
  );
}

function inspectEmailProviderConfig(): {
  configured: boolean;
  missingVars: string[];
  apiKey: string;
  toEmail: string;
  fromEmail: string;
} {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const toEmail = (process.env.CONTACT_TO_EMAIL || '').trim();
  const fromEmail = (process.env.CONTACT_FROM_EMAIL || '').trim();

  const missingVars: string[] = [];
  if (isPlaceholderEnvValue(apiKey)) missingVars.push('RESEND_API_KEY');
  if (isPlaceholderEnvValue(toEmail)) missingVars.push('CONTACT_TO_EMAIL');
  if (isPlaceholderEnvValue(fromEmail)) missingVars.push('CONTACT_FROM_EMAIL');

  return {
    configured: missingVars.length === 0,
    missingVars,
    apiKey,
    toEmail,
    fromEmail,
  };
}

function resolvePublicOrigin(req: Request): string {
  const configuredAppUrl = (process.env.APP_URL || '').trim();
  if (configuredAppUrl && !isPlaceholderEnvValue(configuredAppUrl)) {
    return configuredAppUrl.replace(/\/+$/, '');
  }
  const protoHeader = req.headers['x-forwarded-proto'];
  const proto =
    typeof protoHeader === 'string' && protoHeader.length > 0
      ? protoHeader.split(',')[0].trim()
      : req.protocol || 'https';
  const host = req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

async function createServer() {
  const app = express();
  app.disable('x-powered-by');

  /* Baseline security headers compatible with embedded preview & production HTTPS */
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=()'
    );
    next();
  });

  app.use(express.json({ limit: '32kb' }));

  /* -------------------------------------------------------------------------
     GET /api/contact/status — Safe boolean check (never exposes secret values)
     ------------------------------------------------------------------------- */
  app.get('/api/contact/status', (_req: Request, res: Response) => {
    const status = inspectEmailProviderConfig();
    res.status(200).json({
      emailConfigured: status.configured,
      missingVars: status.missingVars,
    });
  });

  /* -------------------------------------------------------------------------
     POST /api/contact — Server-Side Validation, Rate Limit & Resend Delivery
     ------------------------------------------------------------------------- */
  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        code: 'RATE_LIMITED',
        message:
          'Too many inquiry attempts from this connection. Please wait a few minutes or email us directly.',
      });
      return;
    }

    const validation = validateContactPayload(req.body ?? {});

    /* Honeypot triggered by automated bot */
    if (validation.isSpamHoneypot) {
      res.status(400).json({
        ok: false,
        code: 'SPAM_REJECTED',
        message: "We couldn't send your inquiry right now. Please try again or contact us by email.",
      });
      return;
    }

    if (!validation.valid || !validation.sanitized) {
      res.status(400).json({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please review the highlighted fields and try again.',
        fieldErrors: validation.errors,
      });
      return;
    }

    const inquiry = validation.sanitized;
    const emailConfig = inspectEmailProviderConfig();

    /* Never return fake delivery success when email provider credentials are unconfigured */
    if (!emailConfig.configured) {
      res.status(503).json({
        ok: false,
        code: 'EMAIL_NOT_CONFIGURED',
        message:
          'Online inquiry delivery is not yet configured in this environment. Please contact our team directly at hello@brandyatra.com.',
      });
      return;
    }
    const subject = `New Project Inquiry: ${inquiry.service} — ${inquiry.fullName}`;

    const plainTextBody = [
      'New Project Inquiry — Brand Yatra Website',
      '-----------------------------------------',
      `Full Name: ${inquiry.fullName}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone || 'Not provided'}`,
      `Company / Brand: ${inquiry.company || 'Not provided'}`,
      `Primary Service: ${inquiry.service}`,
      `Estimated Budget: ${inquiry.budget || 'Not specified'}`,
      `Privacy Consent: Confirmed`,
      '',
      'Project Details:',
      inquiry.projectDetails,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; background: #0D0D0D; color: #FFFFFF; padding: 32px; max-width: 640px;">
        <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #F8C311; margin: 0 0 8px;">
          Brand Yatra · Project Inquiry
        </p>
        <h1 style="font-size: 22px; margin: 0 0 24px; color: #FFFFFF;">
          ${escapeHtml(inquiry.fullName)} — ${escapeHtml(inquiry.service)}
        </h1>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #A8A8A8; width: 160px;">Full Name</td>
            <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(inquiry.fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A8A8A8;">Email Address</td>
            <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(inquiry.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A8A8A8;">Phone Number</td>
            <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(inquiry.phone || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A8A8A8;">Company / Brand</td>
            <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(inquiry.company || 'Not provided')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A8A8A8;">Service Interested In</td>
            <td style="padding: 8px 0; color: #F8C311; font-weight: 600;">${escapeHtml(inquiry.service)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #A8A8A8;">Estimated Budget</td>
            <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(inquiry.budget || 'Not specified')}</td>
          </tr>
        </table>
        <div style="border-top: 1px solid rgba(255,255,255,0.14); padding-top: 16px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #A8A8A8; margin: 0 0 8px;">
            Project Details
          </p>
          <p style="font-size: 15px; line-height: 1.65; color: #FFFFFF; white-space: pre-wrap; margin: 0;">${escapeHtml(inquiry.projectDetails)}</p>
        </div>
      </div>
    `;

    try {
      const providerResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${emailConfig.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailConfig.fromEmail,
          to: [emailConfig.toEmail],
          reply_to: inquiry.email,
          subject,
          text: plainTextBody,
          html: htmlBody,
        }),
      });

      const providerPayload = (await providerResponse.json().catch(() => null)) as
        | { id?: string; message?: string }
        | null;

      if (!providerResponse.ok || !providerPayload?.id) {
        res.status(502).json({
          ok: false,
          code: 'DELIVERY_FAILED',
          message:
            "We couldn't send your inquiry right now. Please try again or contact us by email.",
        });
        return;
      }

      res.status(200).json({
        ok: true,
        id: providerPayload.id,
        message: 'Thank you! Your inquiry has been received. Our team will be in touch.',
      });
    } catch {
      res.status(502).json({
        ok: false,
        code: 'DELIVERY_FAILED',
        message:
          "We couldn't send your inquiry right now. Please try again or contact us by email.",
      });
    }
  });

  /* -------------------------------------------------------------------------
     GET /robots.txt — Dynamic Crawl Directives
     ------------------------------------------------------------------------- */
  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = resolvePublicOrigin(req);
    const lines = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      `Sitemap: ${origin}/sitemap.xml`,
      '',
    ];
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(lines.join('\n'));
  });

  /* -------------------------------------------------------------------------
     GET /sitemap.xml — Dynamic Public Route & Content Sitemap (Excludes Drafts)
     ------------------------------------------------------------------------- */
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = resolvePublicOrigin(req);

    const staticRoutes: { path: string; priority: string; changefreq: string }[] = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/process', priority: '0.8', changefreq: 'monthly' },
      { path: '/work', priority: '0.9', changefreq: 'weekly' },
      { path: '/insights', priority: '0.9', changefreq: 'weekly' },
      { path: '/contact', priority: '0.9', changefreq: 'monthly' },
      { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
      { path: '/terms', priority: '0.4', changefreq: 'yearly' },
      { path: '/cookie-policy', priority: '0.4', changefreq: 'yearly' },
    ];

    const serviceRoutes = SERVICES_LIST.map((service) => ({
      path: `/services/${service.slug}`,
      priority: '0.85',
      changefreq: 'monthly',
    }));

    const publishedCaseStudies = PROJECTS_DATA.filter(
      (project) => project.caseStudyStatus === 'published'
    ).map((project) => ({
      path: `/work/${project.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    }));

    const publishedArticles = getPublishedArticles().map((article) => ({
      path: `/insights/${article.slug}`,
      priority: '0.75',
      changefreq: 'monthly',
    }));

    const allEntries = [
      ...staticRoutes,
      ...serviceRoutes,
      ...publishedCaseStudies,
      ...publishedArticles,
    ];

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...allEntries.map(
        (entry) =>
          `  <url>\n    <loc>${escapeHtml(`${origin}${entry.path}`)}</loc>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
      ),
      '</urlset>',
      '',
    ].join('\n');

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  });

  const distDir = path.resolve(__dirname, 'dist');
  const distIndex = path.join(distDir, 'index.html');
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(distIndex);

  if (isProd) {
    app.use(
      '/assets',
      express.static(path.join(distDir, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );
    app.use(express.static(distDir, { index: false }));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(distIndex);
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    process.stdout.write(`Brand Yatra server listening on http://0.0.0.0:${PORT}\n`);
  });
}

createServer();
