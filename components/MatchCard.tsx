import Link from 'next/link';
import type { Match } from '@/lib/matches';

interface Props {
  match: Match;
}

function formatTime(datetimeCT: string): string {
  // datetimeCT is like "2026-06-12T14:00:00" — treat as Central Time
  const [, timePart] = datetimeCT.split('T');
  const [hourStr, minStr] = timePart.split(':');
  let hour = parseInt(hourStr, 10);
  const min = minStr;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${ampm} CT`;
}

function getTodayDateStr(): string {
  const now = new Date();
  // Convert to Central Time (UTC-5, ignoring DST for simplicity since matches use fixed CT)
  const ctOffset = -5 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const ctDate = new Date(utcMs + ctOffset * 60 * 1000);
  return `${ctDate.getFullYear()}-${String(ctDate.getMonth() + 1).padStart(2, '0')}-${String(ctDate.getDate()).padStart(2, '0')}`;
}

function getMatchStatus(match: Match): { label: string; color: string } {
  if (match.completed) {
    return { label: 'Final', color: 'text-slate-400' };
  }
  const now = new Date();
  const matchDate = new Date(match.datetimeCT + '-05:00');
  const diffMs = matchDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 0 && diffHours > -3) {
    return { label: '🔴 LIVE', color: 'text-red-400 animate-pulse' };
  }

  const todayStr = getTodayDateStr();
  const matchDayStr = match.datetimeCT.slice(0, 10);
  if (matchDayStr === todayStr) {
    return { label: 'TODAY', color: 'text-emerald-400 font-bold' };
  }

  return { label: 'Upcoming', color: 'text-slate-400' };
}

export default function MatchCard({ match }: Props) {
  const time = formatTime(match.datetimeCT);
  const status = getMatchStatus(match);

  return (
    <Link href={`/match/${match.slug}`} className="block group">
      <div className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-2xl p-4 transition-all duration-200 cursor-pointer">
        {/* Group badge + status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
            Group {match.group}
          </span>
          <span className={`text-xs ${status.color}`}>{status.label}</span>
        </div>

        {/* Teams */}
        <div className="flex items-center gap-3">
          {/* Home team */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="text-2xl flex-shrink-0">{match.homeFlag}</span>
            <div className="min-w-0">
              <div className="font-semibold text-white text-sm truncate">
                {match.homeTeam}
              </div>
            </div>
          </div>

          {/* Center divider */}
          <div className="flex flex-col items-center flex-shrink-0 px-2">
            {match.completed ? (
              <span className="text-slate-400 font-light text-xs">Final</span>
            ) : (
              <div className="text-center">
                <div className="text-white font-semibold text-sm">{time}</div>
                <div className="text-slate-500 text-xs">vs</div>
              </div>
            )}
          </div>

          {/* Away team */}
          <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
            <div className="min-w-0 text-right">
              <div className="font-semibold text-white text-sm truncate">
                {match.awayTeam}
              </div>
            </div>
            <span className="text-2xl flex-shrink-0">{match.awayFlag}</span>
          </div>
        </div>

        {/* Venue */}
        <div className="mt-3 text-xs text-slate-500 truncate">
          📍 {match.venue}
        </div>

        {/* Arrow hint */}
        <div className="mt-2 flex justify-end">
          <span className="text-slate-600 group-hover:text-slate-300 text-xs transition-colors">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
