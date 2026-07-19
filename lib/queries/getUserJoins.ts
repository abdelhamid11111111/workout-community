import { prisma } from "@/lib/prisma";

type MonthlyJoin = { month: string; joins: number };

export async function getUserJoinsByMonth(monthsBack = 8): Promise<{
  data: MonthlyJoin[];
  totalJoins: number;
  avgPerMonth: number;
  vsLastMonth: number; // percent change, e.g. 33 for +33%
}> {
  const raw = await prisma.$queryRaw<{ month: Date; count: bigint }[]>`
    SELECT date_trunc('month', "joinedAt") AS month, COUNT(*) AS count
    FROM "UserChallenge"
    WHERE "joinedAt" >= date_trunc('month', NOW() - INTERVAL '${monthsBack} months')
    GROUP BY month
    ORDER BY month ASC
  `;

  // build a map so we can fill in months with 0 joins
  const counts = new Map(
    raw.map((r) => [r.month.toISOString().slice(0, 7), Number(r.count)])
  );

  const data: MonthlyJoin[] = [];
  const now = new Date();
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toISOString().slice(0, 7); // "2026-03"
    const label = d.toLocaleString("en-US", { month: "short" }); // "Mar"
    data.push({ month: label, joins: counts.get(key) ?? 0 });
  }

  const totalJoins = data.reduce((sum, d) => sum + d.joins, 0);
  const avgPerMonth = Math.round(totalJoins / data.length);

  const last = data[data.length - 1]?.joins ?? 0;
  const prev = data[data.length - 2]?.joins ?? 0;
  const vsLastMonth = prev === 0 ? 0 : Math.round(((last - prev) / prev) * 100);

  return { data, totalJoins, avgPerMonth, vsLastMonth };
}