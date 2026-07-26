export const dynamic = "force-dynamic";

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  fallback: true,
});

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m ${secs}s`;
}

function formatDateLabel(dateStr: string): string {
  if (dateStr.length !== 8) return dateStr;
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1;
  const day = parseInt(dateStr.substring(6, 8), 10);
  const date = new Date(year, month, day);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export async function GET() {
  const property = `properties/${process.env.GA_PROPERTY_ID}`;
  const now = new Date();
  const startOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const dateRanges = [{ startDate: startOfMonth, endDate: "today" }];

  try {
    const [batch1Response, batch2Response] = await Promise.all([
      analyticsDataClient.batchRunReports({
        property,
        requests: [
          {
            property,
            dateRanges,
            metrics: [
              { name: "activeUsers" },
              { name: "sessions" },
              { name: "userEngagementDuration" },
              { name: "bounceRate" },
            ],
          },
          {
            property,
            dateRanges,
            dimensions: [{ name: "date" }],
            metrics: [
              { name: "activeUsers" },
              { name: "userEngagementDuration" },
            ],
            orderBys: [{ dimension: { dimensionName: "date" } }],
            keepEmptyRows: true,
          },
          {
            property,
            dateRanges,
            dimensions: [{ name: "browser" }],
            metrics: [{ name: "activeUsers" }],
            limit: 5,
          },
          {
            property,
            dateRanges,
            dimensions: [{ name: "deviceCategory" }],
            metrics: [{ name: "activeUsers" }],
          },
          {
            property,
            dateRanges,
            dimensions: [{ name: "country" }],
            metrics: [{ name: "activeUsers" }],
            limit: 5,
          },
        ],
      }),
      analyticsDataClient.batchRunReports({
        property,
        requests: [
          {
            property,
            dateRanges,
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            limit: 5,
          },
          {
            property,
            dateRanges,
            dimensions: [{ name: "sessionSource" }],
            metrics: [{ name: "activeUsers" }],
            limit: 6,
          },
        ],
      }),
    ]);

    const reports = [
      ...(batch1Response[0].reports || []),
      ...(batch2Response[0].reports || []),
    ];

    const cardValues = reports[0]?.rows?.[0]?.metricValues || [];
    const totalVisitors = parseInt(cardValues[0]?.value || "0", 10);
    const uniqueSessions = parseInt(cardValues[1]?.value || "0", 10);
    const totalEngagementSec = parseFloat(cardValues[2]?.value || "0");
    const bounceRateVal = parseFloat(cardValues[3]?.value || "0");

    const avgEngagementPerUser =
      totalVisitors > 0 ? totalEngagementSec / totalVisitors : 0;

    const cardsData = {
      totalVisitors: totalVisitors.toLocaleString(),
      uniqueSessions: uniqueSessions.toLocaleString(),
      avgSession: formatDuration(avgEngagementPerUser),
      bounceRate: `${(bounceRateVal * 100).toFixed(1)}%`,
    };

    // --- GRAPH: per-day visitors + avg engagement duration, with missing days filled as 0 ---
    const byDate = new Map<
      string,
      { visitors: number; duration: number; durationLabel: string }
    >();
    (reports[1]?.rows || []).forEach((row) => {
      const rawDate = row.dimensionValues?.[0]?.value || "";
      const users = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const engagementSec = parseFloat(row.metricValues?.[1]?.value || "0");
      const avgDurationSec = users > 0 ? engagementSec / users : 0;
      byDate.set(rawDate, {
        visitors: users,
        duration: Math.round(avgDurationSec),
        durationLabel: formatDuration(avgDurationSec),
      });
    });

    const graphData: Array<{
      day: string;
      visitors: number;
      duration: number;
      durationLabel: string;
    }> = [];
    const cursor = new Date(startOfMonth + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    while (cursor <= today) {
      const y = cursor.getFullYear();
      const m = String(cursor.getMonth() + 1).padStart(2, "0");
      const d = String(cursor.getDate()).padStart(2, "0");
      const rawDate = `${y}${m}${d}`; // GA4 date format, e.g. "20260722"
      const entry = byDate.get(rawDate) || {
        visitors: 0,
        duration: 0,
        durationLabel: "0m 0s",
      };
      graphData.push({
        day: formatDateLabel(rawDate),
        visitors: entry.visitors,
        duration: entry.duration,
        durationLabel: entry.durationLabel,
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    const browserRows = reports[2]?.rows || [];
    const browserTotal = browserRows.reduce(
      (acc, r) => acc + parseInt(r.metricValues?.[0]?.value || "0", 10),
      0,
    );
    const browserData = browserRows.map((row) => {
      const count = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const pct =
        browserTotal > 0
          ? parseFloat(((count / browserTotal) * 100).toFixed(1))
          : 0;
      return {
        browser: row.dimensionValues?.[0]?.value || "Other",
        count,
        pct,
      };
    });

    const deviceRows = reports[3]?.rows || [];
    const deviceTotal = deviceRows.reduce(
      (acc, r) => acc + parseInt(r.metricValues?.[0]?.value || "0", 10),
      0,
    );
    const deviceData = deviceRows.map((row) => {
      const name = row.dimensionValues?.[0]?.value || "desktop";
      const val = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const value =
        deviceTotal > 0
          ? parseFloat(((val / deviceTotal) * 100).toFixed(1))
          : 0;
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      };
    });

    const countryRows = reports[4]?.rows || [];
    const countryTotal = countryRows.reduce(
      (acc, r) => acc + parseInt(r.metricValues?.[0]?.value || "0", 10),
      0,
    );
    const countryData = countryRows.map((row) => {
      const count = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const pct =
        countryTotal > 0
          ? parseFloat(((count / countryTotal) * 100).toFixed(1))
          : 0;
      return {
        country: row.dimensionValues?.[0]?.value || "Unknown",
        count: count.toLocaleString(),
        pct: `${pct}%`,
      };
    });

    const pageRows = reports[5]?.rows || [];
    const pageTotal = pageRows.reduce(
      (acc, r) => acc + parseInt(r.metricValues?.[0]?.value || "0", 10),
      0,
    );
    const pageData = pageRows.map((row) => {
      const views = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const pct =
        pageTotal > 0 ? parseFloat(((views / pageTotal) * 100).toFixed(1)) : 0;
      return {
        path: row.dimensionValues?.[0]?.value || "/",
        views: views.toLocaleString(),
        pct: `${pct}%`,
      };
    });

    const trafficRows = reports[6]?.rows || [];
    const trafficTotal = trafficRows.reduce(
      (acc, r) => acc + parseInt(r.metricValues?.[0]?.value || "0", 10),
      0,
    );
    const trafficData = trafficRows.map((row) => {
      const name = row.dimensionValues?.[0]?.value || "Direct";
      const val = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const value =
        trafficTotal > 0
          ? parseFloat(((val / trafficTotal) * 100).toFixed(1))
          : 0;
      return {
        name: name === "(direct)" ? "Direct" : name,
        value,
      };
    });

    return NextResponse.json({
      cards: cardsData,
      graph: graphData,
      browsers: browserData,
      devices: deviceData,
      countries: countryData,
      topPages: pageData,
      traffic: trafficData,
    });
  } catch (error) {
    console.error("GA4 API Hybrid Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 },
    );
  }
}