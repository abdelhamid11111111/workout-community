import { prisma } from "@/lib/prisma";

type DailyJoin = { day: string; joins: number };

function startOfWeek(d: Date): Date {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay(); // 0 = Sun, 1 = Mon, ...6 = Sat
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  return date;
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export async function getUserJoinsThisWeek(): Promise<{
  data: DailyJoin[];
  totalJoins: number;
  avgPerDay: number;
  vsLastWeek: number;
}> {
  const now = new Date();
  const thisWeekStart = startOfWeek(now);
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const joins = await prisma.userChallenge.findMany({
    where: { joinedAt: { gte: lastWeekStart } },
    select: { joinedAt: true },
  });

  const counts = new Map<string, number>();
  for (const j of joins) {
    const key = dateKey(j.joinedAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const data: DailyJoin[] = [];
  let totalJoins = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(thisWeekStart);
    d.setDate(d.getDate() + i);
    const key = dateKey(d);
    const joinsCount = counts.get(key) ?? 0;
    data.push({ day: DAY_LABELS[i], joins: joinsCount });
    totalJoins += joinsCount;
  }

  let lastWeekTotal = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(lastWeekStart);
    d.setDate(d.getDate() + i);
    lastWeekTotal += counts.get(dateKey(d)) ?? 0;
  }

  const avgPerDay = Math.round((totalJoins / 7) * 10) / 10;
  const vsLastWeek =
    lastWeekTotal === 0 ? 0 : Math.round(((totalJoins - lastWeekTotal) / lastWeekTotal) * 100);

  return { data, totalJoins, avgPerDay, vsLastWeek };
}








