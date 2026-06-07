/**
 * Single source of truth for the canonical, §15-protected strings.
 * Do not change values here without checking CLAUDE.md §15.
 */

export const SITE = {
  name: 'Ninth Protocol',
  tagline: 'Private Procurement',
  motto: {
    lead: 'For those who answer to no one.',
    leadPlain: 'For those who',
    leadItalic: 'answer to no one.',
  },
  sub: 'A private procurement firm. Conflict-free. Discreet. Accountable to one principal only.',

  hero: {
    stamp: 'CONFIDENTIAL · PRIVATE CIRCULATION',
    footerNote: 'New clients by referral or application.',
    scrollCue: 'Continue',
  },

  articles: {
    hero: { roman: '§I', name: 'Identity' },
    model: { roman: '§II', name: 'The Model' },
    capabilities: { roman: '§III', name: 'Capabilities' },
    contact: { roman: '§IV', name: 'Contact' },
  },

  email: 'JRughooputh@ninthprotocol.eu',

  whatsapp: {
    display: '+1 437 249 0909',
    raw: '14372490909',
    prefilledMessage: 'Ninth Protocol. I am looking to acquire or arrange the following:',
  },

  og: {
    title: 'Ninth Protocol · Private Procurement',
    description: 'For those who answer to no one.',
    image: '/assets/np-lockup-square.png',
  },

  transparency: {
    label: 'Transparency',
    plain: 'Most procurement firms hide their margins inside supplier commissions.',
    italic: 'I publish my fee in full, before any mandate begins.',
  },

  fee: {
    label: 'Fee Structure',
    tier1: {
      roman: 'Tier I',
      range: '$10,000 – $250,000',
      currency: 'USD',
      amount: '500',
      qualifier: 'flat, per acquisition',
    },
    tier2: {
      roman: 'Tier II',
      range: 'Above $250,000',
      pctLow: '0.5',
      pctHigh: '1.0',
      qualifier: 'of acquisition value, agreed in advance',
    },
    rules: ['No commissions', 'No markups', 'No third-party kickbacks'] as const,
    minimum: {
      label: 'Minimum acquisition value',
      value: '$10,000 USD',
    },
  },

  capabilities: [
    {
      num: '01',
      title: 'Automotive & Aviation',
      body: 'The car you want rarely sits on a listing. It is held privately, promised elsewhere, or built only on request. I care about the difference between the reference that matters and the one that merely costs, and I pursue it the way this market is actually navigated: quietly, and on your behalf alone. Hypercars, collector vehicles, JDM, coachbuilt commissions, private aircraft. Found, secured, delivered.',
    },
    {
      num: '02',
      title: 'Horology & Collectibles',
      body: 'A waitlist is not a relationship. The pieces that matter rarely surface in public, and they are never found by asking loudly. I work the way this market works: patiently, precisely, and only for you. Patek, Audemars Piguet, Richard Mille, and the objects that hold their value across a lifetime.',
    },
    {
      num: '03',
      title: 'Experiences & Access',
      body: 'Some things cannot be bought, only arranged. The invitation, the table, the moment that is not on any public calendar. I approach access with the same discretion I bring to everything else, and I build the itinerary around what you actually want from the time, not around what is simple to book.',
    },
    {
      num: '04',
      title: 'Logistics & Project Direction',
      body: 'The hardest part is rarely the acquisition. It is everything after: the build, the restoration, the moving of something irreplaceable across borders without a mark on it. I direct the whole of it, so the only thing that reaches you is the result.',
    },
  ] as const,
} as const;

export type Capability = (typeof SITE.capabilities)[number];

export const whatsappUrl = (() => {
  const text = encodeURIComponent(SITE.whatsapp.prefilledMessage);
  return `https://wa.me/${SITE.whatsapp.raw}?text=${text}`;
})();

export const mailtoUrl = `mailto:${SITE.email}`;

export const smsUrl = (() => {
  const text = encodeURIComponent(SITE.whatsapp.prefilledMessage);
  return `sms:+${SITE.whatsapp.raw}?&body=${text}`;
})();

export const vcardUrl = '/jihan-rughooputh.vcf';
