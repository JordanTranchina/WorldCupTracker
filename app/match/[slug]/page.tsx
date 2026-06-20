import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LINEUPS, type LineupPlayer } from '@/lib/lineups';
import type { Position } from '@/lib/squads';
import OddsDisplay from '@/components/OddsDisplay';
import { TEAM_COLORS, STATIC_MATCHES } from '@/lib/matches';
import { fetchWorldCupMatches, mergeWithStaticMatches } from '@/lib/worldcup-api';
import { FIFA_RANKINGS } from '@/lib/groups';

export const revalidate = 300; // Revalidate every 5 minutes

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let apiMatches = await fetchWorldCupMatches();
  if (apiMatches.length > 0) {
    apiMatches = mergeWithStaticMatches(apiMatches, STATIC_MATCHES);
  }
  const matches = apiMatches.length > 0 ? apiMatches : STATIC_MATCHES;
  const match = matches.find((m) => m.slug === slug);

  if (!match) {
    return {
      title: 'Match Not Found | World Cup 2026',
    };
  }

  return {
    title: `${match.homeTeam} vs ${match.awayTeam} | World Cup 2026`,
  };
}

function formatMatchTime(datetimeCT: string): string {
  const [, timePart] = datetimeCT.split('T');
  const [hourStr, minStr] = timePart.split(':');
  let hour = parseInt(hourStr, 10);
  const min = minStr;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${ampm} CT`;
}

function formatMatchDate(datetimeCT: string): string {
  const date = new Date(datetimeCT + '-05:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const POSITION_ORDER: Position[] = ['GK', 'DEF', 'MID', 'FWD'];
const POSITION_LABELS: Record<Position, string> = {
  GK: 'Goalkeepers',
  DEF: 'Defenders',
  MID: 'Midfielders',
  FWD: 'Forwards',
};
const POSITION_COLORS: Record<Position, string> = {
  GK: '#f59e0b',
  DEF: '#3b82f6',
  MID: '#8b5cf6',
  FWD: '#ef4444',
};

function groupByPosition(players: LineupPlayer[]): Partial<Record<Position, LineupPlayer[]>> {
  const groups: Partial<Record<Position, LineupPlayer[]>> = {};
  for (const p of players) {
    if (!groups[p.position]) groups[p.position] = [];
    groups[p.position]!.push(p);
  }
  return groups;
}

export default async function MatchPage({ params }: Props) {
  const { slug } = await params;

  // Fetch live matches
  let apiMatches = await fetchWorldCupMatches();
  if (apiMatches.length > 0) {
    apiMatches = mergeWithStaticMatches(apiMatches, STATIC_MATCHES);
  }
  const matches = apiMatches.length > 0 ? apiMatches : STATIC_MATCHES;
  const match = matches.find((m) => m.slug === slug);

  if (!match) notFound();

  const lineup = LINEUPS[match.slug];

  const homeColor = TEAM_COLORS[match.homeCode] || '#6b7280';
  const awayColor = TEAM_COLORS[match.awayCode] || '#6b7280';

  const homeRank = FIFA_RANKINGS[match.homeCode];
  const awayRank = FIFA_RANKINGS[match.awayCode];
  const isHotMatch = homeRank && awayRank && Math.abs(homeRank - awayRank) <= 10;

  return (
    <main className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Back nav */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          ← Back to schedule
        </Link>
      </div>

      {/* Match header */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="rounded-2xl border border-slate-700 p-6" style={{ background: '#1e293b' }}>
          {/* Group & date */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 bg-slate-700/60 px-2.5 py-1 rounded-full">
                Group {match.group}
              </span>
              {isHotMatch && (
                <span className="text-sm" title="FIFA rankings difference within 10">🔥</span>
              )}
            </div>
            <span className="text-xs text-slate-500">{formatMatchDate(match.datetimeCT)}</span>
          </div>

          {/* Teams & score/time */}
          <div className="flex items-center gap-4">
            {/* Home team */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-5xl">{match.homeFlag}</span>
              <div className="text-center">
                <div className="font-bold text-white text-lg">
                  {match.homeTeam} <span className="text-sm text-slate-400 font-normal">({FIFA_RANKINGS[match.homeCode] || '—'})</span>
                </div>
                {match.completed && (
                  <div className="text-4xl font-black text-white mt-1">{match.homeScore}</div>
                )}
              </div>
            </div>

            {/* Center */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0 px-4">
              {match.completed ? (
                <>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Final</div>
                  <div className="text-3xl font-black text-white">
                    {match.homeScore} – {match.awayScore}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-white">{formatMatchTime(match.datetimeCT)}</div>
                  <div className="text-xs text-slate-500">vs</div>
                </>
              )}
            </div>

            {/* Away team */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-5xl">{match.awayFlag}</span>
              <div className="text-center">
                <div className="font-bold text-white text-lg">
                  {match.awayTeam} <span className="text-sm text-slate-400 font-normal">({FIFA_RANKINGS[match.awayCode] || '—'})</span>
                </div>
                {match.completed && (
                  <div className="text-4xl font-black text-white mt-1">{match.awayScore}</div>
                )}
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="mt-5 pt-4 border-t border-slate-700 text-center text-sm text-slate-400">
            📍 {match.venue}
          </div>
        </div>
      </div>

      {/* Live odds */}
      <div className="max-w-2xl mx-auto px-4 mb-6">
        {match.completed ? (
          <div className="rounded-2xl border border-slate-700/50 p-4 text-center" style={{ background: '#1e293b' }}>
            <p className="text-slate-500 text-sm">Match completed — betting markets closed</p>
          </div>
        ) : (
          <OddsDisplay
            slug={match.slug}
            homeTeam={match.homeTeam}
            homeCode={match.homeCode}
            homeFlag={match.homeFlag}
            awayTeam={match.awayTeam}
            awayCode={match.awayCode}
            awayFlag={match.awayFlag}
            homeColor={homeColor}
            awayColor={awayColor}
          />
        )}
      </div>

      {/* Lineups */}
      {lineup && (
        <div className="max-w-2xl mx-auto px-4 pb-12">
          <h2 className="text-base font-semibold text-slate-300 mb-4">Lineups</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { flag: match.homeFlag, team: match.homeTeam, side: lineup.home },
              { flag: match.awayFlag, team: match.awayTeam, side: lineup.away },
            ].map(({ flag, team, side }) => (
              <div key={team}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{flag}</span>
                  <span className="font-semibold text-white text-sm">{team}</span>
                </div>

                {/* Starting XI */}
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Starting XI
                  </div>
                  {POSITION_ORDER.map((pos) => {
                    const players = (groupByPosition(side.starters)[pos] ?? []);
                    if (players.length === 0) return null;
                    return (
                      <div key={pos} className="mb-2">
                        <div
                          className="text-xs font-semibold uppercase tracking-wider mb-1 pl-1"
                          style={{ color: POSITION_COLORS[pos] }}
                        >
                          {POSITION_LABELS[pos]}
                        </div>
                        <div className="space-y-1">
                          {players.map((p) => (
                            <div
                              key={p.name}
                              className="rounded-lg px-3 py-1.5"
                              style={{ background: '#1e293b' }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-slate-500 w-5 text-right flex-shrink-0">
                                  {p.number}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-white truncate">{p.name}</div>
                                  <div className="text-xs text-slate-500 truncate">{p.club}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Substitutes */}
                {side.subs.length > 0 && (
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500" />
                      Substitutes
                    </div>
                    {POSITION_ORDER.map((pos) => {
                      const players = (groupByPosition(side.subs)[pos] ?? []);
                      if (players.length === 0) return null;
                      return (
                        <div key={pos} className="mb-2">
                          <div
                            className="text-xs font-semibold uppercase tracking-wider mb-1 pl-1"
                            style={{ color: POSITION_COLORS[pos], opacity: 0.7 }}
                          >
                            {POSITION_LABELS[pos]}
                          </div>
                          <div className="space-y-1">
                            {players.map((p) => (
                              <div
                                key={p.name}
                                className="rounded-lg px-3 py-1.5"
                                style={{ background: '#172033' }}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono text-slate-600 w-5 text-right flex-shrink-0">
                                    {p.number}
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-sm text-slate-400 truncate">{p.name}</div>
                                    <div className="text-xs text-slate-600 truncate">{p.club}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
