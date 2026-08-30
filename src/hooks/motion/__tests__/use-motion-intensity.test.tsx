import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getMotionIntensity, useMotionIntensity } from "../use-motion-intensity";

describe("useMotionIntensity", () => {
  it("defaults to full motion and mirrors it onto the document", () => {
    const { result } = renderHook(() => useMotionIntensity());
    expect(result.current.intensity).toBe("full");
    expect(document.documentElement.dataset["motion"]).toBe("full");
  });

  it("restores a persisted subtle preference", () => {
    window.localStorage.setItem("da:motion-intensity", "subtle");
    const { result } = renderHook(() => useMotionIntensity());
    expect(result.current.intensity).toBe("subtle");
  });

  it("toggles, persists and shares the value", () => {
    const { result } = renderHook(() => useMotionIntensity());
    act(() => result.current.toggle());

    expect(result.current.intensity).toBe("subtle");
    expect(getMotionIntensity()).toBe("subtle");
    expect(window.localStorage.getItem("da:motion-intensity")).toBe("subtle");
    expect(document.documentElement.dataset["motion"]).toBe("subtle");
  });
});
