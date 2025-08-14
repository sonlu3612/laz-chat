import React, { useEffect, useState } from "react";

const MOBILE = 1;
const SMALL_SCREEN = 2;
const LARGE_SCREEN = 3;

const getBreakpoint = (width) => {
  if (width < 640) return MOBILE;
  if (width < 1536) return SMALL_SCREEN;
  return LARGE_SCREEN;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(
    getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    const handleWindowResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);

      setBreakpoint((prevBreakpoint) => {
        if (newBreakpoint !== prevBreakpoint) return newBreakpoint;
        return prevBreakpoint;
      });
    };

    const debouncedHandleResize = debounce(handleWindowResize, 500);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return breakpoint;
};

export { MOBILE, SMALL_SCREEN, LARGE_SCREEN };
export default useBreakpoint;
