import { useEffect, useRef } from "react";

/**
 * A useEffect hook that only runs on updates, not on the initial mount.
 *
 * @param effect - Function to run on updates. Can return a cleanup function.
 * @param dependencies - Array of dependencies that trigger the effect when changed
 *
 * @example
 * ```tsx
 * useUpdateEffect(() => {
 *   console.log('Value updated:', value);
 *   return () => console.log('Cleaning up');
 * }, [value]);
 * ```
 */
export function useUpdateEffect<T extends ReadonlyArray<unknown>>(
  effect: () => void | (() => void),
  dependencies: T
): void {
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const cleanup = effect();
    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
