'use client';

import { useEffect, useState, useCallback } from 'react';
import type { OddsResponse } from '@/app/api/odds/[slug]/route';
import { FIFA_RANKINGS } from '@/lib/groups';

interface Props {
  slug: string;
  homeTeam: string;
  homeCode: string;
  homeFlag: string;
  awayTeam: string;
  awayCode: string;
  awayFlag: string;
  homeColor: string;
  awayColor: string;
}

export default function OddsDisplay({
  slug,
  homeTeam,
  homeCode,
  homeFlag,
  awayTeam,
  awayCode,
  awayFlag,
  homeColor,
  awayColor,
}: Props) {
  const [odds, setOdds] = useState<OddsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchOdds = useCallback(async () => {
    try {
      const res = await fetch(`/api/odds/${slug}`, { cache: 'no-store' });
      const data: OddsResponse = await res.json();
      setOdds(data);
      setLastRefresh(new Date());
    } catch {
      // silently fail, keep previous data
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchOdds();
    const interval = setInterval(fetchOdds, 30_000);
    return () => clearInterval(interval);
  }, [fetchOdds]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-6 animate-pulse">
        <div className="h-4 w-48 bg-slate-700 rounded mb-4" />
        <div className="h-10 bg-slate-700 rounded-full mb-4" />
        <div className="flex justify-between">
          <div className="h-6 w-20 bg-slate-700 rounded" />
          <div className="h-6 w-20 bg-slate-700 rounded" />
        </div>
      </div>
    );
  }

  if (!odds?.available) {
    return (
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-6 text-center">
        <p className="text-slate-400 text-sm">
          Betting odds not yet available for this match
        </p>
      </div>
    );
  }

  const { homeWinPct, drawPct, awayWinPct } = odds;

  // Whether a segment is wide enough to show its label inline
  const showInline = (pct: number) => pct >= 15;

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">Win Probability</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live · updates every 30s · all three outcomes sum to 100%</p>
        </div>
        <a
          href={`https://polymarket.com/event/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          via Polymarket
        </a>
      </div>

      {/* 3-segment odds bar */}
      <div>
        <div className="flex h-12 rounded-xl overflow-hidden shadow-lg">
          {/* Home win */}
          <div
            className="flex items-center justify-center font-bold text-white text-base transition-all duration-700"
            style={{ width: `${homeWinPct}%`, backgroundColor: homeColor }}
          >
            {showInline(homeWinPct) && `${homeWinPct}%`}
          </div>
          {/* Draw */}
          {drawPct > 0 && (
            <div
              className="flex items-center justify-center font-bold text-white text-base transition-all duration-700"
              style={{ width: `${drawPct}%`, backgroundColor: '#475569' }}
            >
              {showInline(drawPct) && `${drawPct}%`}
            </div>
          )}
          {/* Away win */}
          <div
            className="flex items-center justify-center font-bold text-white text-base transition-all duration-700"
            style={{ width: `${awayWinPct}%`, backgroundColor: awayColor }}
          >
            {showInline(awayWinPct) && `${awayWinPct}%`}
          </div>
        </div>

        {/* Labels row — always shown beneath the bar */}
        <div className="flex items-start justify-between mt-3 text-sm">
          {/* Home */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl flex-shrink-0">{homeFlag}</span>
            <div className="min-w-0">
              <div className="font-semibold text-white truncate">
                {homeTeam} <span className="text-xs text-slate-400 font-normal">({FIFA_RANKINGS[homeCode] || '—'})</span>
              </div>
              <div className="font-bold" style={{ color: homeColor }}>{homeWinPct}%</div>
            </div>
          </div>

          {/* Draw */}
          {drawPct > 0 && (
            <div className="flex flex-col items-center flex-shrink-0 px-2">
              <div className="text-xs text-slate-400 font-medium">Draw</div>
              <div className="font-bold text-slate-300">{drawPct}%</div>
            </div>
          )}

          {/* Away */}
          <div className="flex items-center gap-2 min-w-0 text-right">
            <div className="min-w-0 text-right">
              <div className="font-semibold text-white truncate">
                {awayTeam} <span className="text-xs text-slate-400 font-normal">({FIFA_RANKINGS[awayCode] || '—'})</span>
              </div>
              <div className="font-bold" style={{ color: awayColor }}>{awayWinPct}%</div>
            </div>
            <span className="text-xl flex-shrink-0">{awayFlag}</span>
          </div>
        </div>
      </div>

      {/* Volume & refresh */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-700">
        <span>
          Market volume: ${(odds.volume / 1_000_000).toFixed(1)}M
        </span>
        {lastRefresh && (
          <span>
            Updated {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
}
