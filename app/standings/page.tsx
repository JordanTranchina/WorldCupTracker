import { getGroupStandings, type TeamStanding, type ClinchStatus } from '@/lib/groups';
import PageNav from '@/components/PageNav';

function ClinchBadge({ status }: { status: ClinchStatus }) {
  if (!status) return <span className="text-slate-700 text-xs">—</span>;

  const configs: Record<NonNullable<ClinchStatus>, { label: string; className: string }> = {
    first: {
      label: '1st',
      className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    },
    second: {
      label: '2nd',
      className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    third: {
      label: '3rd',
      className: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    },
    eliminated: {
      label: 'Out',
      className: 'bg-red-900/30 text-red-400 border-red-800/40',
    },
  };

  const { label, className } = configs[status];
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold border ${className}`}>
      {label}
    </span>
  );
}

function GDCell({ gd }: { gd: number }) {
  if (gd > 0) return <span className="text-emerald-400 font-medium">+{gd}</span>;
  if (gd < 0) return <span className="text-red-400 font-medium">{gd}</span>;
  return <span className="text-slate-500">0</span>;
}

function GroupTable({ letter, standings }: { letter: string; standings: TeamStanding[] }) {
  return (
    <div className="rounded-2xl border border-slate-700 overflow-hidden" style={{ background: '#1e293b' }}>
      {/* Group header */}
      <div className="px-4 py-3 border-b border-slate-700">
        <span className="text-xs font-bold text-slate-300 bg-slate-700/60 px-2.5 py-1 rounded-full">
          Group {letter}
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid items-center px-4 py-2 border-b border-slate-800/80"
        style={{ gridTemplateColumns: '1fr 2rem 2rem 2rem 2.5rem 2.5rem 3rem' }}
      >
        <div className="text-xs text-slate-500 uppercase tracking-wider">Team</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider text-center">W</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider text-center">D</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider text-center">L</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider text-center">GD</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider text-center">Pts</div>
        <div className="text-xs text-slate-500 uppercase tracking-wider text-center">Status</div>
      </div>

      {/* Team rows */}
      {standings.map((team, idx) => {
        const inTop2 = idx < 2;
        return (
          <div
            key={team.code}
            className={`grid items-center px-4 py-3 ${
              idx < standings.length - 1 ? 'border-b border-slate-800/50' : ''
            }`}
            style={{
              gridTemplateColumns: '1fr 2rem 2rem 2rem 2.5rem 2.5rem 3rem',
              background: inTop2 ? 'rgba(16,185,129,0.04)' : undefined,
            }}
          >
            {/* Team name + flag */}
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <span className="text-xs text-slate-600 font-mono w-3 flex-shrink-0">{idx + 1}</span>
              <span className="text-lg leading-none flex-shrink-0">{team.flag}</span>
              <span className="text-sm font-medium text-white truncate">{team.name}</span>
              {team.played > 0 && (
                <span className="text-xs text-slate-600 flex-shrink-0">({team.played})</span>
              )}
            </div>

            <div className="text-center text-sm font-semibold text-white">{team.won}</div>
            <div className="text-center text-sm text-slate-300">{team.drawn}</div>
            <div className="text-center text-sm text-slate-300">{team.lost}</div>
            <div className="text-center text-sm"><GDCell gd={team.goalDifference} /></div>
            <div className="text-center text-sm font-bold text-white">{team.points}</div>
            <div className="flex justify-center"><ClinchBadge status={team.clinched} /></div>
          </div>
        );
      })}
    </div>
  );
}

export default function StandingsPage() {
  const allStandings = getGroupStandings();
  const groups = Object.keys(allStandings).sort();

  return (
    <main className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Header */}
      <header
        className="border-b border-slate-800 sticky top-0 z-10"
        style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">⚽</div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">World Cup 2026</h1>
              <p className="text-slate-400 text-xs">Group Standings</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs text-slate-500">All times</div>
              <div className="text-xs font-semibold text-emerald-400">Central Time</div>
            </div>
          </div>
          <PageNav />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-12">
        <div className="space-y-5">
          {groups.map(letter => (
            <GroupTable key={letter} letter={letter} standings={allStandings[letter]} />
          ))}
        </div>

        {/* Legend */}
        <div
          className="mt-6 rounded-xl border border-slate-800 p-4"
          style={{ background: '#1e293b' }}
        >
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Legend
          </h3>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }} />
              Top 2 advance automatically
            </div>
            <div className="flex items-center gap-2">
              <ClinchBadge status="first" />
              <span>Clinched 1st place</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">(n)</span>
              <span>Games played by team</span>
            </div>
            <div className="flex items-center gap-2">
              <ClinchBadge status="second" />
              <span>Clinched 2nd / advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <ClinchBadge status="third" />
              <span>Clinched 3rd (best 3rd eligible)</span>
            </div>
            <div className="flex items-center gap-2">
              <ClinchBadge status="eliminated" />
              <span>Mathematically eliminated</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
