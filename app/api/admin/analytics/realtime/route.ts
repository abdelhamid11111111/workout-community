export const dynamic = 'force-dynamic';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

function parsePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  // Strip accidental wrapping quotes (e.g. copied straight from JSON key file)
  const unquoted = raw.trim().replace(/^"([\s\S]*)"$/, '$1');
  return unquoted.replace(/\\n/g, '\n');
}

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: parsePrivateKey(process.env.GA_PRIVATE_KEY),
  },
  fallback: true,
});

function cleanEnvValue(raw: string | undefined): string {
  if (!raw) return '';
  return raw.trim().replace(/^"([\s\S]*)"$/, '$1');
}

export async function GET() {
  const property = `properties/${cleanEnvValue(process.env.GA_PROPERTY_ID)}`;

  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property,
      metrics: [{ name: 'activeUsers' }],
    });

    const activeNow = parseInt(
      response.rows?.[0]?.metricValues?.[0]?.value || '0',
      10
    );

    return NextResponse.json({ activeNow });
  } catch (error) {
    console.error('GA4 Realtime API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch realtime data' }, { status: 500 });
  }
}