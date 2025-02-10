import { useState, useEffect, useRef } from "react";

/**
 * function App() {
  const isIdle = useIdle(10000); //

  return (
    <div style={{ color: isIdle ? "gray" : "green" }}>
      {isIdle ? "System idle ⏳" : "Active 💻"}
    </div>
  );
}

 */

export function useIdle(timeout: number = 30000): boolean {
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleEvent = () => {
      setIsIdle(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

    // Initialize with current state
    handleEvent();

    events.forEach((event) => window.addEventListener(event, handleEvent));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleEvent));
      clearTimeout(timerRef.current);
    };
  }, [timeout]);

  return isIdle;
}
