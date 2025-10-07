import { renderHook, act } from "@testing-library/react";
import { describe, beforeEach, it, expect, vi } from "vitest";

import useBreakpoint, {
  MOBILE,
  SMALL_SCREEN,
  LARGE_SCREEN,
} from "./useBreakpoint";

// 
// MOBILE: < 640
// SMALL_SCREEN: >= 640px and < 1536px
// LARGE_SCREEN: >= 1536px
// 

describe("useBreakpoint", () => {
  beforeEach(() => {
    // Reset window.innerWidth before each test
    window.innerWidth = 1024;
  });

  it("returns MOBILE for width < 640", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(MOBILE);
  });

  it("returns SMALL_SCREEN for 640 <= width < 1536", () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(SMALL_SCREEN);
  });

  it("returns LARGE_SCREEN for width >= 1536", () => {
    window.innerWidth = 1600;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(LARGE_SCREEN);
  });

  it("updates breakpoint on resize", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(SMALL_SCREEN);

    act(() => {
      window.innerWidth = 500;

      window.dispatchEvent(new Event("resize"));

      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(MOBILE);

    vi.useRealTimers();
  });

  it("does not update breakpoint if width stays in same range", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useBreakpoint());
    const initialResult = result.current;

    act(() => {
      window.innerWidth = 900;
      window.dispatchEvent(new Event("resize"));
    });

    vi.advanceTimersByTime(500);
    expect(result.current).toBe(initialResult);
  });
});
