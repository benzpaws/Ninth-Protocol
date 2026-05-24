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
    prefilledMessage: "Hello Ninth Protocol. I'd like to discuss a private mandate.",
  },

  og: {
    title: 'Ninth Protocol · Private Procurement',
    description: 'For those who answer to no one.',
    image: '/assets/np-lockup-square.png',
  },

  transparency: {
    label: 'Transparency',
    plain: 'Most procurement firms hide their margins inside supplier commissions.',
    italic: 'We publish ours in full, before any mandate begins.',
  },

  fee: {
    label: 'Our Fee Structure',
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
      body: 'Hypercars and collector vehicles. JDM acquisitions. Coachbuilt commissions. Private aircraft and discreet charter. Listed, auction, or off-market. Sourced and delivered.',
    },
    {
      num: '02',
      title: 'Horology & Collectibles',
      body: 'Reference-grade Patek, AP, Richard Mille. Art, jewellery, instruments. Sourced from boutiques, auctions, or private collections, including allocations and waitlists.',
    },
    {
      num: '03',
      title: 'Experiences & Access',
      body: 'Invitation-only events. Private itineraries. Standing reservations. Introductions and access, from sold-out fixtures to closed-door rooms.',
    },
    {
      num: '04',
      title: 'Logistics & Project Direction',
      body: 'Bespoke builds, restorations, white-glove transport of high-value assets across borders.',
    },
  ] as const,
} as const;

export type Capability = (typeof SITE.capabilities)[number];

export const whatsappUrl = (() => {
  const text = encodeURIComponent(SITE.whatsapp.prefilledMessage);
  return `https://wa.me/${SITE.whatsapp.raw}?text=${text}`;
})();

export const mailtoUrl = `mailto:${SITE.email}`;
