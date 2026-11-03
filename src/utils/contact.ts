import { AGENCY_INFO } from '../data/agencyData';

export const buildContactMailto = (
  subject: string,
  fields: Record<string, string>,
) => {
  const body = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || 'Not provided'}`)
    .join('\n');

  return `mailto:${AGENCY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
