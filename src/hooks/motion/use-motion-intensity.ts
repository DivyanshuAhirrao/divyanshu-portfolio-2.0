import { useEffect, useState } from "react";

export type MotionIntensity = "subtle" | "full";

const KEY = "da:motion-intensity";
const listeners = new Set<(value: MotionIntensity) => void>();

let current: MotionIntensity = "full";

function read(): MotionIntensity {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "subtle" || stored === "full") return stored;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "subtle" : "full";
}

function apply(value: MotionIntensity) {
  document.documentElement.dataset["motion"] = value;
}

export function getMotionIntensity(): MotionIntensity {
  return current;
}

export function setMotionIntensity(value: MotionIntensity) {
  current = value;
  apply(value);
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((fn) => fn(value));
}

/** Reads the persisted intensity and keeps the `data-motion` attribute in sync. */
export function useMotionIntensity() {
  const [value, setValue] = useState<MotionIntensity>(current);

  useEffect(() => {
    const initial = read();
    current = initial;
    apply(initial);
    setValue(initial);

    listeners.add(setValue);
    return () => {
      listeners.delete(setValue);
    };
  }, []);

  return {
    intensity: value,
    setIntensity: setMotionIntensity,
    toggle: () => setMotionIntensity(current === "full" ? "subtle" : "full"),
  };
}
