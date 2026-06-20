import { fetchWorldCupMatches, mergeWithStaticMatches } from '@/lib/worldcup-api';
import { STATIC_MATCHES } from '@/lib/matches';
import ScheduleView from '@/components/ScheduleView';
import type { Metadata } from 'next';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'World Cup 2026 Schedule & Live Odds',
  description: 'Track live scores, group schedules, and real-time Polymarket betting odds for the 2026 FIFA World Cup.',
};

export default async function HomePage() {
  // Fetch live data from openfootball API
  let apiMatches = await fetchWorldCupMatches();

  // Merge with static data to preserve accurate venue/time info for featured matches
  if (apiMatches.length > 0) {
    apiMatches = mergeWithStaticMatches(apiMatches, STATIC_MATCHES);
  }

  // Use API data if available, fallback to static
  const matches = apiMatches.length > 0 ? apiMatches : STATIC_MATCHES;

  return <ScheduleView matches={matches} />;
}
