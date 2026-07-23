export const dynamic = 'force-dynamic';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export async function GET() {
  const property = `properties/${process.env.GA_PROPERTY_ID}`;

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