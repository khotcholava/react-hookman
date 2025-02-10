import { useState, useEffect } from "react";

/**
function App() {
  const isOnline = useOnlineStatus();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Network Status</h1>
      <p>
        You are currently{" "}
        <span style={{ fontWeight: "bold", color: isOnline ? "green" : "red" }}>
          {isOnline ? "Online" : "Offline"}
        </span>
        .
      </p>
    </div>
  );
}
 */

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.onLine === "boolean"
    ) {
      return navigator.onLine;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
