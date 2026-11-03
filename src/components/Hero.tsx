import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_STATS, PORTFOLIO_SHOWCASE } from '../data/agencyData';
import brandMark from '../assets/images/Logo Mark white.png';
import roboticHand from '../assets/images/hero-robotic-hand-right.png';
import { BtnShape } from './BtnShape';
import { WordRevealHeading } from './WordRevealHeading';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAction = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectsStat = HERO_STATS.find((stat) => stat.icon === 'briefcase');
  const proofStats = HERO_STATS.filter((stat) => stat.icon !== 'briefcase');
  const featuredClients = PORTFOLIO_SHOWCASE.slice(0, 3).map((project) => project.client);

  return (
    <section className="by-hero relative isolate min-h-[100svh] overflow-hidden bg-[#03070B] text-[var(--color-white)]">
      <div className="by-hero__atmosphere pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="by-hero__halo absolute left-1/2 top-[47%] aspect-square w-[min(74vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#03070B] via-[#03070B]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#03070B] via-[#03070B]/75 to-transparent" />
      </div>

      <div className="by-hero__stage relative min-h-[100svh] w-full px-4 pb-10 pt-28 sm:px-6 lg:px-[100px] lg:pb-0 lg:pt-0">
        <div className="by-hero__copy relative z-20 max-w-2xl lg:absolute lg:left-[100px] lg:top-[22%] lg:w-[42%] lg:max-w-[44rem]">
          <div className="by-hero__eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/[0.06] px-3 py-1.5 font-['Manrope',sans-serif] text-[10px] font-bold uppercase tracking-[0.17em] text-sky-100/85 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(89,200,255,0.8)]" aria-hidden="true" />
            Startup Branding &amp; Growth
          </div>

          <WordRevealHeading
            as="h1"
            className="by-hero__headline mb-5 max-w-[18ch] font-['Marcellus',serif] text-[clamp(3rem,7vw,5rem)] font-normal leading-[0.98] tracking-[-0.035em] text-white lg:text-[clamp(3rem,4.2vw,5.25rem)]"
          >
            <span className="block">From Startup Idea</span>
            <span className="block">to Standout Brand.</span>
          </WordRevealHeading>

          <p className="by-hero__description max-w-[36rem] font-['Inter',sans-serif] text-sm leading-[1.75] text-white/75 sm:text-base">
            We help ambitious startups build distinctive identities, powerful digital experiences and marketing strategies designed for growth.
          </p>

          <div className="by-hero__actions relative z-30 mt-7 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <button
              onClick={handleAction}
              className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2.5 px-8 py-4 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)] transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(248,195,17,0.3)] hover:-translate-y-1 active:translate-y-0 sm:w-auto sm:text-sm"
              aria-label="Build Your Brand - Book Consultation"
            >
              <BtnShape fill="#F8C311" />
              <span className="relative z-10">Build Your Brand</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 stroke-[2.8] text-[var(--color-navy)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#portfolio"
              onClick={handleScrollToPortfolio}
              className="group/btn relative inline-flex w-full cursor-pointer items-center justify-center gap-2 px-7 py-4 font-['Inter',sans-serif] text-xs font-extrabold uppercase tracking-wider text-[var(--color-navy)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 sm:w-auto sm:text-sm"
              aria-label="Explore Our Work - Scroll to Portfolio"
            >
              <BtnShape fill="#E5E9ED" className="transition-colors group-hover/btn:fill-[var(--color-primary)]" />
              <span className="relative z-10">Explore Our Work</span>
              <ArrowUpRight className="relative z-10 h-3.5 w-3.5 stroke-[2.8] text-[var(--color-navy)] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="by-hero__mark-wrap relative z-10 mx-auto my-9 flex aspect-square w-[min(56vw,310px)] items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:my-0 lg:w-[clamp(230px,25vw,370px)] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="by-hero__logo-halo absolute inset-[-34%] rounded-full" aria-hidden="true" />
          <div className="by-hero__logo-ring absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/15" aria-hidden="true" />
          <img
            src={brandMark}
            alt="Brand Yatra symbol"
            width={139}
            height={214}
            fetchPriority="high"
            decoding="async"
            className="by-hero__mark relative z-10 h-[72%] w-auto object-contain"
          />
          <span className="by-hero__reflection absolute bottom-[8%] left-1/2 h-[8%] w-[56%] -translate-x-1/2 rounded-[50%]" aria-hidden="true" />
        </div>

        <div className="by-hero__hand by-hero__hand--left pointer-events-none absolute left-[-22%] top-[61%] z-[5] hidden w-[min(42vw,470px)] -translate-y-1/2 sm:block lg:left-[-5%] lg:top-[73%] lg:w-[min(30vw,420px)]" aria-hidden="true">
          <img src={roboticHand} alt="" className="by-hero__hand-image by-hero__hand-image--flipped block h-auto w-full" />
        </div>

        <div className="by-hero__hand by-hero__hand--right pointer-events-none absolute right-[-17%] top-[17%] z-[5] hidden w-[min(40vw,480px)] sm:block lg:right-[-3%] lg:top-[19%] lg:w-[min(31vw,460px)]" aria-hidden="true">
          <img src={roboticHand} alt="" className="by-hero__hand-image block h-auto w-full" />
        </div>

        <div className="by-hero__panels relative z-20 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:absolute lg:right-[100px] lg:top-[34%] lg:w-[clamp(190px,17vw,250px)] lg:grid-cols-1">
          {projectsStat && (
            <div className="by-hero__panel rounded-xl border border-sky-200/15 bg-[#07111B]/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5">
              <span className="mb-3 block font-['Manrope',sans-serif] text-[9px] font-bold uppercase tracking-[0.16em] text-sky-200/65">
                Brand Yatra / Work
              </span>
              <div className="font-['Marcellus',serif] text-4xl leading-none tracking-tight text-white sm:text-5xl">
                {projectsStat.value}
              </div>
              <p className="mt-2 font-['Inter',sans-serif] text-[11px] leading-relaxed text-white/60">
                {projectsStat.label}
              </p>
              <div className="mt-4 h-px bg-gradient-to-r from-sky-300/60 to-transparent" aria-hidden="true" />
            </div>
          )}

          <div className="by-hero__panel rounded-xl border border-white/10 bg-[#07111B]/75 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-5">
            <span className="mb-3 block font-['Manrope',sans-serif] text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
              Selected collaborations
            </span>
            <div className="space-y-2.5 font-['Manrope',sans-serif] text-[11px] font-semibold tracking-wide text-white/85">
              {featuredClients.map((client) => (
                <div key={client} className="flex items-center gap-2.5">
                  <span className="h-1 w-1 rounded-full bg-sky-300" aria-hidden="true" />
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="by-hero__proof relative z-20 mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:max-w-sm lg:absolute lg:bottom-[6%] lg:left-[100px] lg:mt-0 lg:w-[34%] lg:max-w-none">
          {proofStats.map((stat) => (
            <div key={stat.label}>
              <div className="font-['Marcellus',serif] text-2xl leading-none text-white sm:text-3xl">{stat.value}</div>
              <div className="mt-1.5 font-['Inter',sans-serif] text-[10px] uppercase tracking-[0.12em] text-white/50">{stat.label}</div>
            </div>
          ))}
          <p className="col-span-2 mt-1 font-['Inter',sans-serif] text-[10px] tracking-wide text-white/35">
            Independent creative studio · Chandigarh, India
          </p>
        </div>

      </div>
    </section>
  );
};
