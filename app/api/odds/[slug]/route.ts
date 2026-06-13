import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 30;

interface PolymarketMarket {
  id: string;
  question: string;
  outcomes: string;
  outcomePrices: string;
  liquidity: number;
  volume: number;
}

interface PolymarketEvent {
  id: string;
  slug: string;
  title: string;
  markets: PolymarketMarket[];
}

export interface OddsResponse {
  homeWinPct: number;
  awayWinPct: number;
  drawPct: number;
  homeRaw: number;
  awayRaw: number;
  drawRaw: number;
  volume: number;
  lastUpdated: string;
  available: boolean;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `https://gamma-api.polymarket.com/events?slug=${slug}`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) {
      return NextResponse.json({ available: false }, { status: 200 });
    }

    const data: PolymarketEvent[] = await res.json();

    if (!data || data.length === 0 || !data[0].markets) {
      return NextResponse.json({ available: false }, { status: 200 });
    }

    const event = data[0];
    const markets = event.markets;

    // Parse outcomePrices: JSON string like '["0.585","0.415"]'
    const parseYesPrice = (market: PolymarketMarket): number => {
      try {
        const prices = JSON.parse(market.outcomePrices) as string[];
        return parseFloat(prices[0]);
      } catch {
        return 0;
      }
    };

    // Extract team codes from slug: fifwc-{home}-{away}-YYYY-MM-DD
    const slugParts = slug.split('-');
    const homeCode = slugParts[1];
    const awayCode = slugParts[2];

    let homeRaw = 0;
    let awayRaw = 0;
    let drawRaw = 0;
    let totalVolume = 0;

    for (const market of markets) {
      const q = market.question.toLowerCase();
      const price = parseYesPrice(market);
      totalVolume += market.volume || 0;

      if (q.includes('draw')) {
        drawRaw = price;
      } else if (
        q.includes(homeCode) ||
        (homeCode === 'usa' && q.includes('united states')) ||
        (homeCode === 'usa' && q.includes('u.s.a')) ||
        (homeCode === 'eng' && q.includes('england')) ||
        (homeCode === 'esp' && q.includes('spain')) ||
        (homeCode === 'bra' && q.includes('brazil')) ||
        (homeCode === 'tur' && q.includes('turkey')) ||
        (homeCode === 'tur' && q.includes('türkiye')) ||
        (homeCode === 'sco' && q.includes('scotland')) ||
        (homeCode === 'ury' && q.includes('uruguay')) ||
        (homeCode === 'pan' && q.includes('panama'))
      ) {
        homeRaw = price;
      } else if (
        q.includes(awayCode) ||
        (awayCode === 'usa' && q.includes('united states')) ||
        (awayCode === 'usa' && q.includes('u.s.a')) ||
        (awayCode === 'eng' && q.includes('england')) ||
        (awayCode === 'esp' && q.includes('spain')) ||
        (awayCode === 'bra' && q.includes('brazil')) ||
        (awayCode === 'tur' && q.includes('turkey')) ||
        (awayCode === 'tur' && q.includes('türkiye')) ||
        (awayCode === 'sco' && q.includes('scotland')) ||
        (awayCode === 'ury' && q.includes('uruguay')) ||
        (awayCode === 'pan' && q.includes('panama')) ||
        (awayCode === 'aus' && q.includes('australia')) ||
        (awayCode === 'cro' && q.includes('croatia')) ||
        (awayCode === 'gha' && q.includes('ghana')) ||
        (awayCode === 'par' && q.includes('paraguay')) ||
        (awayCode === 'ksa' && q.includes('saudi')) ||
        (awayCode === 'hai' && q.includes('haiti')) ||
        (awayCode === 'cvi' && q.includes('cabo verde')) ||
        (awayCode === 'cvi' && q.includes('cape verde')) ||
        (awayCode === 'mar' && q.includes('morocco'))
      ) {
        awayRaw = price;
      }
    }

    // If matching fails, try positional (non-draw markets sorted by price)
    if (homeRaw === 0 && awayRaw === 0) {
      const winMarkets = markets.filter(
        (m) => !m.question.toLowerCase().includes('draw')
      );
      if (winMarkets.length >= 2) {
        homeRaw = parseYesPrice(winMarkets[0]);
        awayRaw = parseYesPrice(winMarkets[1]);
      }
    }

    const total = homeRaw + awayRaw;
    if (total === 0) {
      return NextResponse.json({ available: false }, { status: 200 });
    }

    const homeWinPct = Math.round((homeRaw / total) * 100);
    const awayWinPct = 100 - homeWinPct;

    const response: OddsResponse = {
      homeWinPct,
      awayWinPct,
      drawPct: Math.round(drawRaw * 100),
      homeRaw: Math.round(homeRaw * 100),
      awayRaw: Math.round(awayRaw * 100),
      drawRaw: Math.round(drawRaw * 100),
      volume: Math.round(totalVolume),
      lastUpdated: new Date().toISOString(),
      available: true,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('Odds fetch error:', err);
    return NextResponse.json({ available: false }, { status: 200 });
  }
}
