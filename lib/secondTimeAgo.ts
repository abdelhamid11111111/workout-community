export function daysRemaining(joinedAt: Date | string, totalDays: number): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const elapsedDays = Math.floor(
    (Date.now() - new Date(joinedAt).getTime()) / msPerDay,
  );
  return Math.max(totalDays - elapsedDays, 0);
}