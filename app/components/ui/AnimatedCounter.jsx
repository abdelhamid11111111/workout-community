import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

export function AnimatedCounter({ value, duration = 1.2, format }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    format ? format(Math.round(latest)) : Math.round(latest).toLocaleString()
  );
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value]);

  return <span ref={ref}>0</span>;
}