export type FeaturedTeam = 'usa' | 'eng' | 'esp' | 'bra';

export interface Match {
  slug: string;
  homeTeam: string;
  homeCode: string;
  homeFlag: string;
  awayTeam: string;
  awayCode: string;
  awayFlag: string;
  /** ISO datetime in CDT (America/Chicago, UTC-5 in summer) */
  datetimeCT: string;
  group: string;
  venue: string;
  completed: boolean;
  homeScore?: number;
  awayScore?: number;
  featuredTeams: FeaturedTeam[];
}

/**
 * Static match data for the 4 featured teams.
 * These have accurate slugs, venues, and times that match lineups and Polymarket odds.
 * Scores may be stale — the API fetch will update them.
 */
export const STATIC_MATCHES: Match[] = [
  {
    slug: 'fifwc-usa-par-2026-06-12',
    homeTeam: 'USA',
    homeCode: 'usa',
    homeFlag: '🇺🇸',
    awayTeam: 'Paraguay',
    awayCode: 'par',
    awayFlag: '🇵🇾',
    datetimeCT: '2026-06-12T14:00:00',
    group: 'D',
    venue: 'SoFi Stadium, Inglewood, CA',
    completed: true,
    homeScore: 4,
    awayScore: 1,
    featuredTeams: ['usa'],
  },
  {
    slug: 'fifwc-bra-mar-2026-06-13',
    homeTeam: 'Brazil',
    homeCode: 'bra',
    homeFlag: '🇧🇷',
    awayTeam: 'Morocco',
    awayCode: 'mar',
    awayFlag: '🇲🇦',
    datetimeCT: '2026-06-13T17:00:00',
    group: 'C',
    venue: 'MetLife Stadium, East Rutherford, NJ',
    completed: true,
    homeScore: 1,
    awayScore: 1,
    featuredTeams: ['bra'],
  },
  {
    slug: 'fifwc-esp-cvi-2026-06-15',
    homeTeam: 'Spain',
    homeCode: 'esp',
    homeFlag: '🇪🇸',
    awayTeam: 'Cape Verde',
    awayCode: 'cvi',
    awayFlag: '🇨🇻',
    datetimeCT: '2026-06-15T11:00:00',
    group: 'H',
    venue: 'Mercedes-Benz Stadium, Atlanta, GA',
    completed: true,
    homeScore: 0,
    awayScore: 0,
    featuredTeams: ['esp'],
  },
  {
    slug: 'fifwc-eng-cro-2026-06-17',
    homeTeam: 'England',
    homeCode: 'eng',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'Croatia',
    awayCode: 'cro',
    awayFlag: '🇭🇷',
    datetimeCT: '2026-06-17T15:00:00',
    group: 'L',
    venue: 'AT&T Stadium, Arlington, TX',
    completed: true,
    homeScore: 4,
    awayScore: 2,
    featuredTeams: ['eng'],
  },
  {
    slug: 'fifwc-usa-aus-2026-06-19',
    homeTeam: 'USA',
    homeCode: 'usa',
    homeFlag: '🇺🇸',
    awayTeam: 'Australia',
    awayCode: 'aus',
    awayFlag: '🇦🇺',
    datetimeCT: '2026-06-19T14:00:00',
    group: 'D',
    venue: 'Lumen Field, Seattle, WA',
    completed: true,
    homeScore: 2,
    awayScore: 0,
    featuredTeams: ['usa'],
  },
  {
    slug: 'fifwc-bra-hai-2026-06-19',
    homeTeam: 'Brazil',
    homeCode: 'bra',
    homeFlag: '🇧🇷',
    awayTeam: 'Haiti',
    awayCode: 'hai',
    awayFlag: '🇭🇹',
    datetimeCT: '2026-06-19T20:00:00',
    group: 'C',
    venue: "Lincoln Financial Field, Philadelphia, PA",
    completed: true,
    homeScore: 3,
    awayScore: 0,
    featuredTeams: ['bra'],
  },
  {
    slug: 'fifwc-esp-ksa-2026-06-21',
    homeTeam: 'Spain',
    homeCode: 'esp',
    homeFlag: '🇪🇸',
    awayTeam: 'Saudi Arabia',
    awayCode: 'ksa',
    awayFlag: '🇸🇦',
    datetimeCT: '2026-06-21T11:00:00',
    group: 'H',
    venue: 'Mercedes-Benz Stadium, Atlanta, GA',
    completed: false,
    featuredTeams: ['esp'],
  },
  {
    slug: 'fifwc-eng-gha-2026-06-23',
    homeTeam: 'England',
    homeCode: 'eng',
    homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'Ghana',
    awayCode: 'gha',
    awayFlag: '🇬🇭',
    datetimeCT: '2026-06-23T15:00:00',
    group: 'L',
    venue: 'Gillette Stadium, Foxborough, MA',
    completed: false,
    featuredTeams: ['eng'],
  },
  {
    slug: 'fifwc-sco-bra-2026-06-24',
    homeTeam: 'Scotland',
    homeCode: 'sco',
    homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    awayTeam: 'Brazil',
    awayCode: 'bra',
    awayFlag: '🇧🇷',
    datetimeCT: '2026-06-24T17:00:00',
    group: 'C',
    venue: 'Arrowhead Stadium, Kansas City, MO',
    completed: false,
    featuredTeams: ['bra'],
  },
  {
    slug: 'fifwc-tur-usa-2026-06-25',
    homeTeam: 'Türkiye',
    homeCode: 'tur',
    homeFlag: '🇹🇷',
    awayTeam: 'USA',
    awayCode: 'usa',
    awayFlag: '🇺🇸',
    datetimeCT: '2026-06-25T21:00:00',
    group: 'D',
    venue: 'MetLife Stadium, East Rutherford, NJ',
    completed: false,
    featuredTeams: ['usa'],
  },
  {
    slug: 'fifwc-ury-esp-2026-06-26',
    homeTeam: 'Uruguay',
    homeCode: 'ury',
    homeFlag: '🇺🇾',
    awayTeam: 'Spain',
    awayCode: 'esp',
    awayFlag: '🇪🇸',
    datetimeCT: '2026-06-26T19:00:00',
    group: 'H',
    venue: 'Arrowhead Stadium, Kansas City, MO',
    completed: false,
    featuredTeams: ['esp'],
  },
  {
    slug: 'fifwc-nzl-egy-2026-06-22',
    homeTeam: 'New Zealand',
    homeCode: 'nzl',
    homeFlag: '🇳🇿',
    awayTeam: 'Egypt',
    awayCode: 'egy',
    awayFlag: '🇪🇬',
    datetimeCT: '2026-06-22T20:00:00',
    group: 'G',
    venue: 'BC Place, Vancouver, BC',
    completed: false,
    featuredTeams: [],
  },
  {
    slug: 'fifwc-pan-eng-2026-06-27',
    homeTeam: 'Panama',
    homeCode: 'pan',
    homeFlag: '🇵🇦',
    awayTeam: 'England',
    awayCode: 'eng',
    awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    datetimeCT: '2026-06-27T16:00:00',
    group: 'L',
    venue: 'NRG Stadium, Houston, TX',
    completed: false,
    featuredTeams: ['eng'],
  },
];

/** Keep backward compat — MATCHES is the static set for client components that import it directly */
export const MATCHES = STATIC_MATCHES;

export function getMatchBySlug(slug: string): Match | undefined {
  return MATCHES.find((m) => m.slug === slug);
}

export function groupMatchesByDay(matches: Match[]): Record<string, Match[]> {
  const grouped: Record<string, Match[]> = {};
  for (const match of matches) {
    const day = match.datetimeCT.split('T')[0];
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(match);
  }
  return grouped;
}

export const TEAM_COLORS: Record<string, string> = {
  // Original featured teams
  usa: '#3B82F6',
  bra: '#22C55E',
  eng: '#1E3A5F',
  esp: '#DC2626',
  par: '#6B7280',
  aus: '#F59E0B',
  tur: '#EF4444',
  cro: '#CC0000',
  gha: '#059669',
  pan: '#EF4444',
  cvi: '#3B82F6',
  ksa: '#16A34A',
  ury: '#3B82F6',
  hai: '#1D4ED8',
  sco: '#1E3A8A',
  mar: '#CC1326',
  // New teams
  mex: '#006847',
  rsa: '#007749',
  kor: '#C60C30',
  cze: '#11457E',
  can: '#FF0000',
  bih: '#002395',
  qat: '#8A1538',
  sui: '#FF0000',
  ger: '#000000',
  cur: '#002B7F',
  civ: '#FF8200',
  ecu: '#FFD100',
  ned: '#FF6600',
  jpn: '#000080',
  swe: '#006AA7',
  tun: '#E70013',
  bel: '#ED2939',
  egy: '#C8102E',
  irn: '#239F40',
  nzl: '#000000',
  fra: '#002395',
  sen: '#00853F',
  irq: '#007A3D',
  nor: '#BA0C2F',
  arg: '#75AADB',
  alg: '#006233',
  aut: '#ED2939',
  jor: '#007A33',
  por: '#006600',
  cod: '#007FFF',
  uzb: '#1EB53A',
  col: '#FCD116',
};
