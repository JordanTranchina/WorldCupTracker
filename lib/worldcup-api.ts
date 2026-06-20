import { OPENFOOTBALL_NAME_MAP, getTeamByCode } from './groups';
import type { Match } from './matches';
import { TEAM_COLORS } from './matches';

const OPENFOOTBALL_URL =
  'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

interface OpenFootballMatch {
  round: string;
  date: string;
  time?: string;
  team1: string;
  team2: string;
  score?: { ft: [number, number]; ht?: [number, number] };
  group?: string;
  ground?: string;
}

interface OpenFootballData {
  name: string;
  matches: OpenFootballMatch[];
}

function makeSlug(homeCode: string, awayCode: string, date: string): string {
  return `fifwc-${homeCode}-${awayCode}-${date}`;
}

function parseGroupLetter(group: string): string {
  // "Group A" -> "A"
  return group.replace('Group ', '');
}

/**
 * Converts an openfootball time string like "15:00 UTC-5" into a CT datetime string.
 * Returns something like "2026-06-12T14:00:00" (CT = UTC-5 in summer).
 */
function parseTimeToCT(date: string, timeStr?: string): string {
  if (!timeStr) return `${date}T00:00:00`;

  // Parse "HH:MM UTC±N"
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*UTC([+-]\d+)$/);
  if (!match) return `${date}T00:00:00`;

  const hours = parseInt(match[1], 10);
  const minutes = match[2];
  const utcOffset = parseInt(match[3], 10);

  // CT is UTC-5 in summer (CDT)
  const ctOffset = -5;
  const diff = ctOffset - utcOffset;
  let ctHours = hours + diff;

  // Handle day wrap
  if (ctHours < 0) ctHours += 24;
  if (ctHours >= 24) ctHours -= 24;

  return `${date}T${String(ctHours).padStart(2, '0')}:${minutes}:00`;
}

export async function fetchWorldCupMatches(): Promise<Match[]> {
  const res = await fetch(OPENFOOTBALL_URL, { next: { revalidate: 300 } });
  if (!res.ok) {
    console.error('Failed to fetch world cup data:', res.status);
    return [];
  }

  const data: OpenFootballData = await res.json();
  const matches: Match[] = [];

  for (const m of data.matches) {
    // Only include group stage matches
    if (!m.group || !m.group.startsWith('Group')) continue;

    const homeCode = OPENFOOTBALL_NAME_MAP[m.team1];
    const awayCode = OPENFOOTBALL_NAME_MAP[m.team2];
    if (!homeCode || !awayCode) continue;

    const homeTeam = getTeamByCode(homeCode);
    const awayTeam = getTeamByCode(awayCode);
    if (!homeTeam || !awayTeam) continue;

    const groupLetter = parseGroupLetter(m.group);
    const slug = makeSlug(homeCode, awayCode, m.date);
    const completed = !!m.score;

    matches.push({
      slug,
      homeTeam: homeTeam.name,
      homeCode: homeTeam.code,
      homeFlag: homeTeam.flag,
      awayTeam: awayTeam.name,
      awayCode: awayTeam.code,
      awayFlag: awayTeam.flag,
      datetimeCT: parseTimeToCT(m.date, m.time),
      group: groupLetter,
      venue: m.ground || '',
      completed,
      homeScore: completed ? m.score!.ft[0] : undefined,
      awayScore: completed ? m.score!.ft[1] : undefined,
      featuredTeams: [],
    });
  }

  // Sort by date
  matches.sort((a, b) => a.datetimeCT.localeCompare(b.datetimeCT));

  return matches;
}

/** Merge API data with our static MATCHES to preserve existing slugs/venues for featured matches */
export function mergeWithStaticMatches(apiMatches: Match[], staticMatches: Match[]): Match[] {
  // Build a lookup by home+away+date from static matches
  const staticLookup = new Map<string, Match>();
  for (const m of staticMatches) {
    const key = `${m.homeCode}-${m.awayCode}-${m.datetimeCT.slice(0, 10)}`;
    staticLookup.set(key, m);
  }

  return apiMatches.map(apiMatch => {
    const key = `${apiMatch.homeCode}-${apiMatch.awayCode}-${apiMatch.datetimeCT.slice(0, 10)}`;
    const staticMatch = staticLookup.get(key);

    if (staticMatch) {
      // Use static match's slug, venue, datetimeCT, featuredTeams — but API's score data
      return {
        ...staticMatch,
        completed: apiMatch.completed,
        homeScore: apiMatch.homeScore,
        awayScore: apiMatch.awayScore,
      };
    }

    return apiMatch;
  });
}
