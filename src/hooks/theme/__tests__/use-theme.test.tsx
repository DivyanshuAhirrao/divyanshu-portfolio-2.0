import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { THEME_KEY, getTheme, setTheme, useTheme } from "../use-theme";

describe("useTheme", () => {
  it("defaults to dark when nothing is stored and the system is dark", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(document.documentElement.dataset["theme"]).toBe("dark");
  });

  it("restores a persisted preference", () => {
    window.localStorage.setItem(THEME_KEY, "light");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  it("persists the toggled value and keeps the module in sync", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());

    expect(result.current.theme).toBe("light");
    expect(getTheme()).toBe("light");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("light");

    act(() => setTheme("dark"));
    expect(result.current.theme).toBe("dark");
  });

  it("notifies every mounted consumer", () => {
    const a = renderHook(() => useTheme());
    const b = renderHook(() => useTheme());

    act(() => a.result.current.setTheme("light"));
    expect(b.result.current.theme).toBe("light");
  });
});
