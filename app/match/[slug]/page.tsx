import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMatchBySlug } from '@/lib/matches';
import { getSquad, type Position } from '@/lib/squads';
import OddsDisplay from '@/components/OddsDisplay';
import { TEAM_COLORS } from '@/lib/matches';

interface Props {
  params: Promise<{ slug: string }>;
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

export default async function MatchPage({ params }: Props) {
  const { slug } = await params;
  const match = getMatchBySlug(slug);

  if (!match) notFound();

  const homeSquad = getSquad(match.homeCode);
  const awaySquad = getSquad(match.awayCode);

  const homeColor = TEAM_COLORS[match.homeCode] || '#6b7280';
  const awayColor = TEAM_COLORS[match.awayCode] || '#6b7280';

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
            <span className="text-xs font-semibold text-slate-400 bg-slate-700/60 px-2.5 py-1 rounded-full">
              Group {match.group}
            </span>
            <span className="text-xs text-slate-500">{formatMatchDate(match.datetimeCT)}</span>
          </div>

          {/* Teams & score/time */}
          <div className="flex items-center gap-4">
            {/* Home team */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-5xl">{match.homeFlag}</span>
              <div className="text-center">
                <div className="font-bold text-white text-lg">{match.homeTeam}</div>
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
                <div className="font-bold text-white text-lg">{match.awayTeam}</div>
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

      {/* Rosters */}
      {(homeSquad || awaySquad) && (
        <div className="max-w-2xl mx-auto px-4 pb-12">
          <h2 className="text-base font-semibold text-slate-300 mb-4">Squads</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Home squad */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{match.homeFlag}</span>
                <span className="font-semibold text-white text-sm">{match.homeTeam}</span>
              </div>
              {homeSquad ? (
                <div className="space-y-4">
                  {POSITION_ORDER.map((pos) => {
                    const players = homeSquad.players.filter((p) => p.position === pos);
                    if (players.length === 0) return null;
                    return (
                      <div key={pos}>
                        <div
                          className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                          style={{ color: POSITION_COLORS[pos] }}
                        >
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full"
                            style={{ background: POSITION_COLORS[pos] }}
                          />
                          {POSITION_LABELS[pos]}
                        </div>
                        <div className="space-y-1.5">
                          {players.map((p) => (
                            <div
                              key={p.name}
                              className="rounded-lg px-3 py-2"
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
              ) : (
                <div className="text-sm text-slate-500">Squad not available</div>
              )}
            </div>

            {/* Away squad */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{match.awayFlag}</span>
                <span className="font-semibold text-white text-sm">{match.awayTeam}</span>
              </div>
              {awaySquad ? (
                <div className="space-y-4">
                  {POSITION_ORDER.map((pos) => {
                    const players = awaySquad.players.filter((p) => p.position === pos);
                    if (players.length === 0) return null;
                    return (
                      <div key={pos}>
                        <div
                          className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                          style={{ color: POSITION_COLORS[pos] }}
                        >
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full"
                            style={{ background: POSITION_COLORS[pos] }}
                          />
                          {POSITION_LABELS[pos]}
                        </div>
                        <div className="space-y-1.5">
                          {players.map((p) => (
                            <div
                              key={p.name}
                              className="rounded-lg px-3 py-2"
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
              ) : (
                <div className="text-sm text-slate-500">Squad not available</div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
