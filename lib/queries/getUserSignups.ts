import { prisma } from "@/lib/prisma";

type DailySignup = { day: string; users: number };

function startOfWeek(d: Date): Date {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay(); // 0 = Sun, 1 = Mon, ...6 = Sat
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  return date;
}

function dateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export async function getUserSignupsThisWeek(): Promise<{
  data: DailySignup[];
  totalThisWeek: number;
  avgPerDay: number;
  peakDay: string;
}> {
  const now = new Date();
  const thisWeekStart = startOfWeek(now);

  const signups = await prisma.user.findMany({
    where: { createdAt: { gte: thisWeekStart } },
    select: { createdAt: true },
  });

  const counts = new Map<string, number>();
  for (const s of signups) {
    const key = dateKey(s.createdAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const data: DailySignup[] = [];
  let totalThisWeek = 0;
  let peakDay = DAY_LABELS[0];
  let peakCount = -1;

  for (let i = 0; i < 7; i++) {
    const d = new Date(thisWeekStart);
    d.setDate(d.getDate() + i);
    const key = dateKey(d);
    const usersCount = counts.get(key) ?? 0;
    data.push({ day: DAY_LABELS[i], users: usersCount });
    totalThisWeek += usersCount;

    if (usersCount > peakCount) {
      peakCount = usersCount;
      peakDay = DAY_LABELS[i];
    }
  }

  const avgPerDay = Math.round((totalThisWeek / 7) * 10) / 10;

  return { data, totalThisWeek, avgPerDay, peakDay };
}