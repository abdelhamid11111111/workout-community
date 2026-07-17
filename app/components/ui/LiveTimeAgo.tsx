"use client";
import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/timeAgo";

export function LiveTimeAgo({ date }: { date: string }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, [date]);

  return <span>{timeAgo(date)}</span>;
}