'use client';

import { useEffect, useState, useCallback } from 'react';
import type { OddsResponse } from '@/app/api/odds/[slug]/route';

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
  homeFlag,
  awayTeam,
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

  const { homeWinPct, awayWinPct } = odds;

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Live Win Probability</h3>
        <a
          href={`https://polymarket.com/sports/world-cup/games`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          via Polymarket
        </a>
      </div>

      {/* Odds bar */}
      <div className="relative">
        <div className="flex h-12 rounded-xl overflow-hidden shadow-lg">
          <div
            className="flex items-center justify-center font-bold text-white text-lg transition-all duration-700"
            style={{ width: `${homeWinPct}%`, backgroundColor: homeColor }}
          >
            {homeWinPct >= 20 && `${homeWinPct}%`}
          </div>
          <div
            className="flex items-center justify-center font-bold text-white text-lg transition-all duration-700"
            style={{ width: `${awayWinPct}%`, backgroundColor: awayColor }}
          >
            {awayWinPct >= 20 && `${awayWinPct}%`}
          </div>
        </div>
        {/* Small percentages if one side is too narrow */}
        {(homeWinPct < 20 || awayWinPct < 20) && (
          <div className="flex justify-between mt-2 text-sm font-semibold">
            <span style={{ color: homeColor }}>{homeWinPct}%</span>
            <span style={{ color: awayColor }}>{awayWinPct}%</span>
          </div>
        )}
      </div>

      {/* Team labels */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">{homeFlag}</span>
          <div>
            <div className="font-semibold text-white">{homeTeam}</div>
            <div className="text-slate-400">{homeWinPct}% chance</div>
          </div>
        </div>
        <div className="text-slate-500 font-light text-xs">vs</div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <div className="font-semibold text-white">{awayTeam}</div>
            <div className="text-slate-400">{awayWinPct}% chance</div>
          </div>
          <span className="text-lg">{awayFlag}</span>
        </div>
      </div>

      {/* Draw probability note */}
      {odds.drawPct > 0 && (
        <div className="text-center text-xs text-slate-500">
          Draw probability: {odds.drawPct}% · Win % normalized to 100%
        </div>
      )}

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
