export interface GroupTeam {
  code: string;
  name: string;
  flag: string;
}

export const GROUP_TEAMS: Record<string, GroupTeam[]> = {
  A: [
    { code: 'mex', name: 'Mexico', flag: '🇲🇽' },
    { code: 'rsa', name: 'South Africa', flag: '🇿🇦' },
    { code: 'kor', name: 'South Korea', flag: '🇰🇷' },
    { code: 'cze', name: 'Czechia', flag: '🇨🇿' },
  ],
  B: [
    { code: 'can', name: 'Canada', flag: '🇨🇦' },
    { code: 'bih', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
    { code: 'qat', name: 'Qatar', flag: '🇶🇦' },
    { code: 'sui', name: 'Switzerland', flag: '🇨🇭' },
  ],
  C: [
    { code: 'bra', name: 'Brazil', flag: '🇧🇷' },
    { code: 'mar', name: 'Morocco', flag: '🇲🇦' },
    { code: 'sco', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    { code: 'hai', name: 'Haiti', flag: '🇭🇹' },
  ],
  D: [
    { code: 'usa', name: 'USA', flag: '🇺🇸' },
    { code: 'par', name: 'Paraguay', flag: '🇵🇾' },
    { code: 'aus', name: 'Australia', flag: '🇦🇺' },
    { code: 'tur', name: 'Türkiye', flag: '🇹🇷' },
  ],
  E: [
    { code: 'ger', name: 'Germany', flag: '🇩🇪' },
    { code: 'cur', name: 'Curaçao', flag: '🇨🇼' },
    { code: 'civ', name: 'Ivory Coast', flag: '🇨🇮' },
    { code: 'ecu', name: 'Ecuador', flag: '🇪🇨' },
  ],
  F: [
    { code: 'ned', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'jpn', name: 'Japan', flag: '🇯🇵' },
    { code: 'swe', name: 'Sweden', flag: '🇸🇪' },
    { code: 'tun', name: 'Tunisia', flag: '🇹🇳' },
  ],
  G: [
    { code: 'bel', name: 'Belgium', flag: '🇧🇪' },
    { code: 'egy', name: 'Egypt', flag: '🇪🇬' },
    { code: 'irn', name: 'Iran', flag: '🇮🇷' },
    { code: 'nzl', name: 'New Zealand', flag: '🇳🇿' },
  ],
  H: [
    { code: 'esp', name: 'Spain', flag: '🇪🇸' },
    { code: 'ury', name: 'Uruguay', flag: '🇺🇾' },
    { code: 'ksa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'cvi', name: 'Cape Verde', flag: '🇨🇻' },
  ],
  I: [
    { code: 'fra', name: 'France', flag: '🇫🇷' },
    { code: 'sen', name: 'Senegal', flag: '🇸🇳' },
    { code: 'irq', name: 'Iraq', flag: '🇮🇶' },
    { code: 'nor', name: 'Norway', flag: '🇳🇴' },
  ],
  J: [
    { code: 'arg', name: 'Argentina', flag: '🇦🇷' },
    { code: 'alg', name: 'Algeria', flag: '🇩🇿' },
    { code: 'aut', name: 'Austria', flag: '🇦🇹' },
    { code: 'jor', name: 'Jordan', flag: '🇯🇴' },
  ],
  K: [
    { code: 'por', name: 'Portugal', flag: '🇵🇹' },
    { code: 'cod', name: 'DR Congo', flag: '🇨🇩' },
    { code: 'uzb', name: 'Uzbekistan', flag: '🇺🇿' },
    { code: 'col', name: 'Colombia', flag: '🇨🇴' },
  ],
  L: [
    { code: 'eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { code: 'cro', name: 'Croatia', flag: '🇭🇷' },
    { code: 'gha', name: 'Ghana', flag: '🇬🇭' },
    { code: 'pan', name: 'Panama', flag: '🇵🇦' },
  ],
};

/** Map openfootball team names → our team codes */
export const OPENFOOTBALL_NAME_MAP: Record<string, string> = {
  'Mexico': 'mex',
  'South Africa': 'rsa',
  'South Korea': 'kor',
  'Czech Republic': 'cze',
  'Canada': 'can',
  'Bosnia & Herzegovina': 'bih',
  'Qatar': 'qat',
  'Switzerland': 'sui',
  'Brazil': 'bra',
  'Morocco': 'mar',
  'Scotland': 'sco',
  'Haiti': 'hai',
  'USA': 'usa',
  'Paraguay': 'par',
  'Australia': 'aus',
  'Turkey': 'tur',
  'Germany': 'ger',
  'Curaçao': 'cur',
  'Ivory Coast': 'civ',
  'Ecuador': 'ecu',
  'Netherlands': 'ned',
  'Japan': 'jpn',
  'Sweden': 'swe',
  'Tunisia': 'tun',
  'Belgium': 'bel',
  'Egypt': 'egy',
  'Iran': 'irn',
  'New Zealand': 'nzl',
  'Spain': 'esp',
  'Uruguay': 'ury',
  'Saudi Arabia': 'ksa',
  'Cape Verde': 'cvi',
  'France': 'fra',
  'Senegal': 'sen',
  'Iraq': 'irq',
  'Norway': 'nor',
  'Argentina': 'arg',
  'Algeria': 'alg',
  'Austria': 'aut',
  'Jordan': 'jor',
  'Portugal': 'por',
  'DR Congo': 'cod',
  'Uzbekistan': 'uzb',
  'Colombia': 'col',
  'England': 'eng',
  'Croatia': 'cro',
  'Ghana': 'gha',
  'Panama': 'pan',
};

/** Reverse lookup: code → team info */
export function getTeamByCode(code: string): GroupTeam | undefined {
  for (const teams of Object.values(GROUP_TEAMS)) {
    const found = teams.find(t => t.code === code);
    if (found) return found;
  }
  return undefined;
}

/** Get all teams as a flat sorted list */
export function getAllTeams(): GroupTeam[] {
  const all: GroupTeam[] = [];
  for (const teams of Object.values(GROUP_TEAMS)) {
    all.push(...teams);
  }
  return all.sort((a, b) => a.name.localeCompare(b.name));
}

export const FIFA_RANKINGS: Record<string, number> = {
  arg: 1, esp: 2, fra: 3, eng: 4, por: 5, bra: 6, mar: 7, ned: 8, bel: 9, ger: 10,
  cro: 11, col: 13, mex: 14, sen: 15, ury: 16, usa: 17, jpn: 18, sui: 19, irn: 20,
  tur: 22, ecu: 23, aut: 24, kor: 25, aus: 27, alg: 28, egy: 29, can: 30, nor: 31,
  civ: 33, pan: 34, swe: 38, cze: 40, par: 41, sco: 42, tun: 45, cod: 46, uzb: 50,
  qat: 56, irq: 57, rsa: 60, ksa: 61, jor: 63, bih: 64, cvi: 67, gha: 73, cur: 82,
  hai: 83, nzl: 85,
};

export type ClinchStatus = 'first' | 'second' | 'eliminated' | undefined;

export interface TeamStanding {
  code: string;
  name: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  clinched: ClinchStatus;
}

interface GroupMatchData {
  group: string;
  homeCode: string;
  awayCode: string;
  completed: boolean;
  homeScore?: number;
  awayScore?: number;
}

// All 72 group-stage matches. Update `completed`/scores as matches finish.
const GROUP_MATCHES: GroupMatchData[] = [
  // ── Group A ──────────────────────────────────────────
  { group: 'A', homeCode: 'mex', awayCode: 'rsa', completed: true,  homeScore: 2, awayScore: 0 },
  { group: 'A', homeCode: 'kor', awayCode: 'cze', completed: true,  homeScore: 2, awayScore: 1 },
  { group: 'A', homeCode: 'cze', awayCode: 'rsa', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'A', homeCode: 'mex', awayCode: 'kor', completed: true,  homeScore: 1, awayScore: 0 },
  { group: 'A', homeCode: 'mex', awayCode: 'cze', completed: false },
  { group: 'A', homeCode: 'kor', awayCode: 'rsa', completed: false },

  // ── Group B ──────────────────────────────────────────
  { group: 'B', homeCode: 'can', awayCode: 'bih', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'B', homeCode: 'qat', awayCode: 'sui', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'B', homeCode: 'sui', awayCode: 'bih', completed: true,  homeScore: 4, awayScore: 1 },
  { group: 'B', homeCode: 'can', awayCode: 'qat', completed: true,  homeScore: 6, awayScore: 0 },
  { group: 'B', homeCode: 'can', awayCode: 'sui', completed: false },
  { group: 'B', homeCode: 'bih', awayCode: 'qat', completed: false },

  // ── Group C ──────────────────────────────────────────
  { group: 'C', homeCode: 'bra', awayCode: 'mar', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'C', homeCode: 'sco', awayCode: 'hai', completed: true,  homeScore: 1, awayScore: 0 },
  { group: 'C', homeCode: 'mar', awayCode: 'sco', completed: true,  homeScore: 1, awayScore: 0 },
  { group: 'C', homeCode: 'bra', awayCode: 'hai', completed: true,  homeScore: 3, awayScore: 0 },
  { group: 'C', homeCode: 'bra', awayCode: 'sco', completed: false },
  { group: 'C', homeCode: 'mar', awayCode: 'hai', completed: false },

  // ── Group D ──────────────────────────────────────────
  { group: 'D', homeCode: 'usa', awayCode: 'par', completed: true,  homeScore: 4, awayScore: 1 },
  { group: 'D', homeCode: 'aus', awayCode: 'tur', completed: true,  homeScore: 2, awayScore: 0 },
  { group: 'D', homeCode: 'usa', awayCode: 'aus', completed: true,  homeScore: 2, awayScore: 0 },
  { group: 'D', homeCode: 'par', awayCode: 'tur', completed: true,  homeScore: 1, awayScore: 0 },
  { group: 'D', homeCode: 'usa', awayCode: 'tur', completed: false },
  { group: 'D', homeCode: 'aus', awayCode: 'par', completed: false },

  // ── Group E ──────────────────────────────────────────
  { group: 'E', homeCode: 'ger', awayCode: 'cur', completed: true,  homeScore: 7, awayScore: 1 },
  { group: 'E', homeCode: 'civ', awayCode: 'ecu', completed: true,  homeScore: 1, awayScore: 0 },
  { group: 'E', homeCode: 'ger', awayCode: 'civ', completed: false },
  { group: 'E', homeCode: 'ecu', awayCode: 'cur', completed: false },
  { group: 'E', homeCode: 'ger', awayCode: 'ecu', completed: false },
  { group: 'E', homeCode: 'civ', awayCode: 'cur', completed: false },

  // ── Group F ──────────────────────────────────────────
  { group: 'F', homeCode: 'ned', awayCode: 'jpn', completed: true,  homeScore: 2, awayScore: 2 },
  { group: 'F', homeCode: 'swe', awayCode: 'tun', completed: true,  homeScore: 5, awayScore: 1 },
  { group: 'F', homeCode: 'swe', awayCode: 'jpn', completed: false },
  { group: 'F', homeCode: 'ned', awayCode: 'tun', completed: false },
  { group: 'F', homeCode: 'swe', awayCode: 'ned', completed: false },
  { group: 'F', homeCode: 'jpn', awayCode: 'tun', completed: false },

  // ── Group G ──────────────────────────────────────────
  { group: 'G', homeCode: 'bel', awayCode: 'egy', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'G', homeCode: 'irn', awayCode: 'nzl', completed: true,  homeScore: 2, awayScore: 2 },
  { group: 'G', homeCode: 'bel', awayCode: 'irn', completed: false },
  { group: 'G', homeCode: 'egy', awayCode: 'nzl', completed: false },
  { group: 'G', homeCode: 'bel', awayCode: 'nzl', completed: false },
  { group: 'G', homeCode: 'irn', awayCode: 'egy', completed: false },

  // ── Group H ──────────────────────────────────────────
  { group: 'H', homeCode: 'esp', awayCode: 'cvi', completed: true,  homeScore: 0, awayScore: 0 },
  { group: 'H', homeCode: 'ksa', awayCode: 'ury', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'H', homeCode: 'esp', awayCode: 'ksa', completed: false },
  { group: 'H', homeCode: 'ury', awayCode: 'cvi', completed: false },
  { group: 'H', homeCode: 'ury', awayCode: 'esp', completed: false },
  { group: 'H', homeCode: 'ksa', awayCode: 'cvi', completed: false },

  // ── Group I ──────────────────────────────────────────
  { group: 'I', homeCode: 'fra', awayCode: 'sen', completed: true,  homeScore: 3, awayScore: 1 },
  { group: 'I', homeCode: 'nor', awayCode: 'irq', completed: true,  homeScore: 4, awayScore: 1 },
  { group: 'I', homeCode: 'fra', awayCode: 'nor', completed: false },
  { group: 'I', homeCode: 'sen', awayCode: 'irq', completed: false },
  { group: 'I', homeCode: 'fra', awayCode: 'irq', completed: false },
  { group: 'I', homeCode: 'sen', awayCode: 'nor', completed: false },

  // ── Group J ──────────────────────────────────────────
  { group: 'J', homeCode: 'arg', awayCode: 'alg', completed: true,  homeScore: 3, awayScore: 0 },
  { group: 'J', homeCode: 'aut', awayCode: 'jor', completed: true,  homeScore: 3, awayScore: 1 },
  { group: 'J', homeCode: 'arg', awayCode: 'aut', completed: false },
  { group: 'J', homeCode: 'alg', awayCode: 'jor', completed: false },
  { group: 'J', homeCode: 'arg', awayCode: 'jor', completed: false },
  { group: 'J', homeCode: 'alg', awayCode: 'aut', completed: false },

  // ── Group K ──────────────────────────────────────────
  { group: 'K', homeCode: 'por', awayCode: 'cod', completed: true,  homeScore: 1, awayScore: 1 },
  { group: 'K', homeCode: 'col', awayCode: 'uzb', completed: true,  homeScore: 3, awayScore: 1 },
  { group: 'K', homeCode: 'col', awayCode: 'por', completed: false },
  { group: 'K', homeCode: 'cod', awayCode: 'uzb', completed: false },
  { group: 'K', homeCode: 'por', awayCode: 'uzb', completed: false },
  { group: 'K', homeCode: 'cod', awayCode: 'col', completed: false },

  // ── Group L ──────────────────────────────────────────
  { group: 'L', homeCode: 'eng', awayCode: 'cro', completed: true,  homeScore: 4, awayScore: 2 },
  { group: 'L', homeCode: 'gha', awayCode: 'pan', completed: true,  homeScore: 1, awayScore: 0 },
  { group: 'L', homeCode: 'eng', awayCode: 'gha', completed: false },
  { group: 'L', homeCode: 'cro', awayCode: 'pan', completed: false },
  { group: 'L', homeCode: 'eng', awayCode: 'pan', completed: false },
  { group: 'L', homeCode: 'cro', awayCode: 'gha', completed: false },
];

function applyMatchToStats(
  stats: Record<string, TeamStanding>,
  m: GroupMatchData,
): void {
  const home = stats[m.homeCode];
  const away = stats[m.awayCode];
  if (!home || !away || !m.completed || m.homeScore === undefined || m.awayScore === undefined) return;

  home.played++;
  away.played++;
  home.goalsFor += m.homeScore;
  home.goalsAgainst += m.awayScore;
  away.goalsFor += m.awayScore;
  away.goalsAgainst += m.homeScore;

  if (m.homeScore > m.awayScore) {
    home.won++; home.points += 3; away.lost++;
  } else if (m.homeScore < m.awayScore) {
    away.won++; away.points += 3; home.lost++;
  } else {
    home.drawn++; away.drawn++; home.points += 1; away.points += 1;
  }
}

function h2hSort(tiedTeams: TeamStanding[], matchList: GroupMatchData[]): TeamStanding[] {
  const codes = new Set(tiedTeams.map(t => t.code));
  const h2h: Record<string, { pts: number; gd: number; gf: number }> = {};
  for (const t of tiedTeams) h2h[t.code] = { pts: 0, gd: 0, gf: 0 };

  for (const m of matchList) {
    if (!m.completed || m.homeScore === undefined || m.awayScore === undefined) continue;
    if (!codes.has(m.homeCode) || !codes.has(m.awayCode)) continue;
    h2h[m.homeCode].gf += m.homeScore;
    h2h[m.homeCode].gd += m.homeScore - m.awayScore;
    h2h[m.awayCode].gf += m.awayScore;
    h2h[m.awayCode].gd += m.awayScore - m.homeScore;
    if (m.homeScore > m.awayScore) h2h[m.homeCode].pts += 3;
    else if (m.homeScore < m.awayScore) h2h[m.awayCode].pts += 3;
    else { h2h[m.homeCode].pts += 1; h2h[m.awayCode].pts += 1; }
  }

  return [...tiedTeams].sort((a, b) => {
    const ptsDiff = h2h[b.code].pts - h2h[a.code].pts;
    if (ptsDiff !== 0) return ptsDiff;
    const gdDiff = h2h[b.code].gd - h2h[a.code].gd;
    if (gdDiff !== 0) return gdDiff;
    const gfDiff = h2h[b.code].gf - h2h[a.code].gf;
    if (gfDiff !== 0) return gfDiff;
    const overallGdDiff = b.goalDifference - a.goalDifference;
    if (overallGdDiff !== 0) return overallGdDiff;
    return b.goalsFor - a.goalsFor;
  });
}

function sortStandings(teams: TeamStanding[], matchList: GroupMatchData[]): TeamStanding[] {
  const byPoints: Record<number, TeamStanding[]> = {};
  for (const t of teams) {
    (byPoints[t.points] ??= []).push(t);
  }
  const result: TeamStanding[] = [];
  for (const pts of Object.keys(byPoints).map(Number).sort((a, b) => b - a)) {
    const group = byPoints[pts];
    result.push(...(group.length === 1 ? group : h2hSort(group, matchList)));
  }
  return result;
}

function makeBlankStats(teams: GroupTeam[]): Record<string, TeamStanding> {
  const stats: Record<string, TeamStanding> = {};
  for (const t of teams) {
    stats[t.code] = {
      code: t.code, name: t.name, flag: t.flag,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, goalDifference: 0,
      points: 0, clinched: undefined,
    };
  }
  return stats;
}

export function computeGroupStandings(groupLetter: string): TeamStanding[] {
  const teams = GROUP_TEAMS[groupLetter];
  if (!teams) return [];

  const allGroupMatches = GROUP_MATCHES.filter(m => m.group === groupLetter);
  const completedMatches = allGroupMatches.filter(
    m => m.completed && m.homeScore !== undefined && m.awayScore !== undefined,
  );
  const remainingMatches = allGroupMatches.filter(m => !m.completed);

  // Build current standings
  const stats = makeBlankStats(teams);
  for (const m of completedMatches) applyMatchToStats(stats, m);
  for (const code in stats) {
    stats[code].goalDifference = stats[code].goalsFor - stats[code].goalsAgainst;
  }

  const current = sortStandings(Object.values(stats), completedMatches);

  if (!current.some(t => t.played > 0)) return current;

  // All games done — assign final positions
  if (remainingMatches.length === 0) {
    const positions: ClinchStatus[] = ['first', 'second', undefined, 'eliminated'];
    return current.map((t, i) => ({ ...t, clinched: positions[i] }));
  }

  // Simulate all W/D/L outcomes for remaining matches (3^n scenarios)
  const outcomes: GroupMatchData[][] = [[]];
  for (const m of remainingMatches) {
    const next: GroupMatchData[][] = [];
    for (const scenario of outcomes) {
      next.push([...scenario, { ...m, completed: true, homeScore: 1, awayScore: 0 }]);
      next.push([...scenario, { ...m, completed: true, homeScore: 0, awayScore: 0 }]);
      next.push([...scenario, { ...m, completed: true, homeScore: 0, awayScore: 1 }]);
    }
    outcomes.length = 0;
    outcomes.push(...next);
  }

  // For each team track the range of final positions across all scenarios
  const bestPos: Record<string, number> = {};
  const worstPos: Record<string, number> = {};
  for (const t of teams) { bestPos[t.code] = 4; worstPos[t.code] = 1; }

  for (const simRemaining of outcomes) {
    const s = makeBlankStats(teams);
    for (const m of [...completedMatches, ...simRemaining]) applyMatchToStats(s, m);
    for (const code in s) s[code].goalDifference = s[code].goalsFor - s[code].goalsAgainst;
    const sorted = sortStandings(Object.values(s), [...completedMatches, ...simRemaining]);
    sorted.forEach((t, i) => {
      const rank = i + 1;
      if (rank < bestPos[t.code]) bestPos[t.code] = rank;
      if (rank > worstPos[t.code]) worstPos[t.code] = rank;
    });
  }

  return current.map(t => {
    let clinched: ClinchStatus = undefined;
    if (worstPos[t.code] === 1) clinched = 'first';
    else if (worstPos[t.code] <= 2) clinched = 'second';
    else if (bestPos[t.code] >= 3) clinched = 'eliminated';
    return { ...t, clinched };
  });
}

export function getGroupStandings(): Record<string, TeamStanding[]> {
  const result: Record<string, TeamStanding[]> = {};
  for (const letter of Object.keys(GROUP_TEAMS)) {
    result[letter] = computeGroupStandings(letter);
  }
  return result;
}
