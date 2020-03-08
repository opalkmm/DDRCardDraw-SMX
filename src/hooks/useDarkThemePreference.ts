import { useState, useEffect } from "preact/hooks";

export const prefersDarkQuery = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

/**
 * Returns true if user prefers dark theme
 */
export function useDarkThemePreference() {
  const [matches, setMatches] = useState(prefersDarkQuery.matches);
  useEffect(() => {
    function handleThemeChange(a: MediaQueryListEvent) {
      setMatches(a.matches);
    }
    prefersDarkQuery.addEventListener("change", handleThemeChange);
    return () => {
      prefersDarkQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return matches;
}
