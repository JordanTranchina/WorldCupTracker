import { MATCHES, type Match } from './matches';

export interface GroupTeam {
  code: string;
  name: string;
  flag: string;
}

export const GROUP_TEAMS: Record<string, GroupTeam[]> = {
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
  H: [
    { code: 'esp', name: 'Spain', flag: '🇪🇸' },
    { code: 'ury', name: 'Uruguay', flag: '🇺🇾' },
    { code: 'ksa', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'cvi', name: 'Cape Verde', flag: '🇨🇻' },
  ],
  L: [
    { code: 'eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { code: 'cro', name: 'Croatia', flag: '🇭🇷' },
    { code: 'gha', name: 'Ghana', flag: '🇬🇭' },
    { code: 'pan', name: 'Panama', flag: '🇵🇦' },
  ],
};

export type ClinchStatus = 'first' | 'second' | 'third' | 'eliminated' | undefined;

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

  for (const match of matches.filter(m => m.group === groupLetter)) {
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

  const standings = Object.values(stats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.name.localeCompare(b.name);
  });

  if (!standings.some(t => t.played > 0)) return standings;

  // All 4 teams have played all 3 games — group is complete
  if (standings.every(t => t.played === 3)) {
    const positions: ClinchStatus[] = ['first', 'second', 'third', 'eliminated'];
    return standings.map((team, idx) => ({ ...team, clinched: positions[idx] }));
  }

  return standings.map((team, idx) => {
    const teamMaxPts = team.points + (3 - team.played) * 3;
    const others = standings.filter((_, i) => i !== idx);

    // Teams that can still match or exceed this team's current points
    const couldMatchOrBeat = others.filter(
      o => o.points + (3 - o.played) * 3 >= team.points
    ).length;

    // Teams already guaranteed to finish above this team regardless of remaining results
    const guaranteedAhead = others.filter(o => o.points > teamMaxPts).length;

    if (couldMatchOrBeat === 0) return { ...team, clinched: 'first' };
    if (couldMatchOrBeat <= 1) return { ...team, clinched: 'second' };

    if (guaranteedAhead >= 2) {
      // Cannot finish top 2 — check if 3rd is clinched
      const lastTeam = standings[standings.length - 1];
      const clinched: ClinchStatus =
        team.code !== lastTeam.code &&
        lastTeam.points + (3 - lastTeam.played) * 3 < team.points
          ? 'third'
          : 'eliminated';
      return { ...team, clinched };
    }

    return team;
  });
}

export function getGroupStandings(): Record<string, TeamStanding[]> {
  const result: Record<string, TeamStanding[]> = {};
  for (const groupLetter of Object.keys(GROUP_TEAMS)) {
    result[groupLetter] = computeGroupStandings(groupLetter, MATCHES);
  }
  return result;
}
