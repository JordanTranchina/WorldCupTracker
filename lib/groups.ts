import type { Match } from './matches';

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
  hai: 83, nzl: 85
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

interface MinimalMatch {
  homeCode: string;
  awayCode: string;
  homeScore?: number;
  awayScore?: number;
  completed: boolean;
}

function resolveTie(tiedTeams: TeamStanding[], groupMatches: MinimalMatch[]): TeamStanding[] {
  const codes = tiedTeams.map(t => t.code);
  
  const h2hStats: Record<string, { points: number; gd: number; gf: number }> = {};
  for (const code of codes) {
    h2hStats[code] = { points: 0, gd: 0, gf: 0 };
  }

  const h2hMatches = groupMatches.filter(
    m => m.completed && codes.includes(m.homeCode) && codes.includes(m.awayCode)
  );

  for (const m of h2hMatches) {
    const home = h2hStats[m.homeCode];
    const away = h2hStats[m.awayCode];
    if (!home || !away || m.homeScore === undefined || m.awayScore === undefined) continue;

    home.gf += m.homeScore;
    home.gd += (m.homeScore - m.awayScore);
    away.gf += m.awayScore;
    away.gd += (m.awayScore - m.homeScore);

    if (m.homeScore > m.awayScore) {
      home.points += 3;
    } else if (m.homeScore < m.awayScore) {
      away.points += 3;
    } else {
      home.points += 1;
      away.points += 1;
    }
  }

  return [...tiedTeams].sort((a, b) => {
    const h2hPtsDiff = h2hStats[b.code].points - h2hStats[a.code].points;
    if (h2hPtsDiff !== 0) return h2hPtsDiff;

    const h2hGdDiff = h2hStats[b.code].gd - h2hStats[a.code].gd;
    if (h2hGdDiff !== 0) return h2hGdDiff;

    const h2hGfDiff = h2hStats[b.code].gf - h2hStats[a.code].gf;
    if (h2hGfDiff !== 0) return h2hGfDiff;

    const gdDiff = b.goalDifference - a.goalDifference;
    if (gdDiff !== 0) return gdDiff;

    const gfDiff = b.goalsFor - a.goalsFor;
    if (gfDiff !== 0) return gfDiff;

    return a.name.localeCompare(b.name);
  });
}

function sortStandings(stats: TeamStanding[], groupMatches: MinimalMatch[]): TeamStanding[] {
  const pointsGroups: Record<number, TeamStanding[]> = {};
  for (const team of stats) {
    const pts = team.points;
    if (!pointsGroups[pts]) pointsGroups[pts] = [];
    pointsGroups[pts].push(team);
  }

  const sortedPoints = Object.keys(pointsGroups)
    .map(Number)
    .sort((a, b) => b - a);

  const finalStandings: TeamStanding[] = [];

  for (const pts of sortedPoints) {
    const tiedTeams = pointsGroups[pts];
    if (tiedTeams.length === 1) {
      finalStandings.push(tiedTeams[0]);
    } else {
      const resolved = resolveTie(tiedTeams, groupMatches);
      finalStandings.push(...resolved);
    }
  }

  return finalStandings;
}

export function computeGroupStandings(groupLetter: string, matches: Match[]): TeamStanding[] {
  const teams = GROUP_TEAMS[groupLetter];
  if (!teams) return [];

  const stats: Record<string, TeamStanding> = {};
  for (const team of teams) {
    stats[team.code] = {
      code: team.code,
      name: team.name,
      flag: team.flag,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      clinched: undefined,
    };
  }

  const groupMatches = matches.filter(m => m.group === groupLetter);

  for (const match of groupMatches) {
    if (!match.completed || match.homeScore === undefined || match.awayScore === undefined) continue;
    const home = stats[match.homeCode];
    const away = stats[match.awayCode];
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (match.homeScore < match.awayScore) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points += 1;
      away.points += 1;
    }
  }

  for (const code in stats) {
    stats[code].goalDifference = stats[code].goalsFor - stats[code].goalsAgainst;
  }

  const standings = sortStandings(Object.values(stats), groupMatches);

  if (!standings.some(t => t.played > 0)) return standings;

  if (standings.every(t => t.played === 3)) {
    const positions: ClinchStatus[] = ['first', 'second', undefined, 'eliminated'];
    return standings.map((team, idx) => ({ ...team, clinched: positions[idx] }));
  }

  // Clinch detection based on points math simulation with H2H tiebreakers
  const completedMatches = groupMatches.filter(m => m.completed && m.homeScore !== undefined && m.awayScore !== undefined);
  const remainingMatches = groupMatches.filter(m => !m.completed);

  const outcomes: MinimalMatch[][] = [];
  
  function recurse(idx: number, current: any[]) {
    if (idx === remainingMatches.length) {
      outcomes.push([...current]);
      return;
    }
    const match = remainingMatches[idx];
    recurse(idx + 1, [...current, { ...match, homeScore: 1, awayScore: 0, completed: true }]);
    recurse(idx + 1, [...current, { ...match, homeScore: 0, awayScore: 0, completed: true }]);
    recurse(idx + 1, [...current, { ...match, homeScore: 0, awayScore: 1, completed: true }]);
  }
  
  recurse(0, completedMatches);

  const teamRanks: Record<string, number[]> = {};
  for (const team of teams) {
    teamRanks[team.code] = [];
  }

  for (const scenario of outcomes) {
    const statsForScenario: Record<string, TeamStanding> = {};
    for (const team of teams) {
      statsForScenario[team.code] = {
        code: team.code,
        name: team.name,
        flag: team.flag,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        clinched: undefined,
      };
    }
    
    for (const match of scenario) {
      const home = statsForScenario[match.homeCode];
      const away = statsForScenario[match.awayCode];
      if (!home || !away || match.homeScore === undefined || match.awayScore === undefined) continue;

      home.played++;
      away.played++;
      home.goalsFor += match.homeScore;
      home.goalsAgainst += match.awayScore;
      away.goalsFor += match.awayScore;
      away.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.won++;
        home.points += 3;
        away.lost++;
      } else if (match.homeScore < match.awayScore) {
        away.won++;
        away.points += 3;
        home.lost++;
      } else {
        home.drawn++;
        away.drawn++;
        home.points += 1;
        away.points += 1;
      }
    }
    
    for (const code in statsForScenario) {
      statsForScenario[code].goalDifference = statsForScenario[code].goalsFor - statsForScenario[code].goalsAgainst;
    }
    
    const sortedScenario = sortStandings(Object.values(statsForScenario), scenario);
    
    sortedScenario.forEach((team, rankIdx) => {
      teamRanks[team.code].push(rankIdx + 1);
    });
  }

  return standings.map(team => {
    const ranks = teamRanks[team.code];
    if (!ranks || ranks.length === 0) return team;

    const minBest = Math.min(...ranks);
    const maxWorst = Math.max(...ranks);

    let clinched: ClinchStatus = undefined;
    if (maxWorst === 1) {
      clinched = 'first';
    } else if (maxWorst <= 2) {
      clinched = 'second';
    } else if (minBest >= 3) {
      clinched = 'eliminated';
    }

    return { ...team, clinched };
  });
}
