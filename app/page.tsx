'use client';

import { useState } from 'react';
import MatchCard from '@/components/MatchCard';
import PageNav from '@/components/PageNav';
import { MATCHES, groupMatchesByDay, type FeaturedTeam } from '@/lib/matches';

const TEAMS: { code: FeaturedTeam | 'all'; label: string; flag: string }[] = [
  { code: 'all', label: 'All Teams', flag: '🌎' },
  { code: 'usa', label: 'USA', flag: '🇺🇸' },
  { code: 'eng', label: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'esp', label: 'Spain', flag: '🇪🇸' },
  { code: 'bra', label: 'Brazil', flag: '🇧🇷' },
];

function getTodayStr(): string {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function formatDayHeader(dateStr: string): string {
  const todayStr = getTodayStr();
  const date = new Date(dateStr + 'T12:00:00');

  if (dateStr === todayStr) {
    return `Today — ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
  if (dateStr === tomorrowStr) {
    return `Tomorrow — ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
  }

  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function HomePage() {
  const [activeTeam, setActiveTeam] = useState<FeaturedTeam | 'all'>('all');

  const todayStr = getTodayStr();

  const filtered = MATCHES.filter((m) =>
    activeTeam === 'all' ? true : m.featuredTeams.includes(activeTeam)
  );

  const grouped = groupMatchesByDay(filtered);
  const sortedDays = Object.keys(grouped).sort();

  const upcomingDays = sortedDays.filter((d) => d >= todayStr);
  const pastDays = sortedDays.filter((d) => d < todayStr).reverse();

  return (
    <main className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Header */}
      <header className="border-b border-slate-800 sticky top-0 z-10" style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">⚽</div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">World Cup 2026</h1>
              <p className="text-slate-400 text-xs">USA · England · Spain · Brazil</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs text-slate-500">All times</div>
              <div className="text-xs font-semibold text-emerald-400">Central Time</div>
            </div>
          </div>

          <PageNav />

          {/* Team filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mt-3">
            {TEAMS.map((t) => (
              <button
                key={t.code}
                onClick={() => setActiveTeam(t.code)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border ${
                  activeTeam === t.code
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                }`}
              >
                <span className="text-base">{t.flag}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-12">
        {/* Upcoming matches */}
        {upcomingDays.length > 0 && (
          <section className="mt-6">
            {upcomingDays.map((day) => (
              <div key={day} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  {day === todayStr && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <h2 className="text-sm font-semibold" style={{ color: day === todayStr ? '#34d399' : '#94a3b8' }}>
                    {formatDayHeader(day)}
                  </h2>
                </div>
                <div className="space-y-3">
                  {grouped[day].map((match) => (
                    <MatchCard key={match.slug} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Divider before past */}
        {pastDays.length > 0 && upcomingDays.length > 0 && (
          <div className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Results</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
        )}

        {/* Past matches */}
        {pastDays.length > 0 && (
          <section>
            {pastDays.length > 0 && upcomingDays.length === 0 && (
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Results</h2>
            )}
            {pastDays.map((day) => (
              <div key={day} className="mb-6">
                <div className="text-xs text-slate-600 mb-2">{formatDayHeader(day)}</div>
                <div className="space-y-3 opacity-70">
                  {grouped[day].map((match) => (
                    <MatchCard key={match.slug} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: '#64748b' }}>
            No matches found
          </div>
        )}
      </div>
    </main>
  );
}
