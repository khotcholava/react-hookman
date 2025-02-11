import { useState, useEffect, useMemo } from "react";

type TimeUnit = "ms" | "seconds" | "minutes" | "hours" | "days";
type TimeFormat = {
  showMilliseconds?: boolean;
  showSeconds?: boolean;
  showMinutes?: boolean;
  showHours?: boolean;
  showDays?: boolean;
};

interface TimeValues {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  formatted: string;
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

/**
 * Custom hook for countdown timer with formatting in different units
 * @param initialTime - Initial time value
 * @param unit - Time unit of the initial value ('ms' | 'seconds' | 'minutes' | 'hours' | 'days')
 * @param format - Object specifying which units to show in formatted output
 * @param autoStart - Whether to start the countdown automatically
 * @returns Object containing separated time values, formatted string and control functions
 */
export function useCountdown(
  initialTime: number,
  unit: TimeUnit = "ms",
  format: TimeFormat = {
    showMilliseconds: true,
    showSeconds: true,
    showMinutes: true,
    showHours: true,
    showDays: true,
  },
  autoStart: boolean = true
): TimeValues {
  // Convert initial time to milliseconds
  const initialMs = useMemo(() => {
    switch (unit) {
      case "days":
        return (
          initialTime *
          HOURS_IN_DAY *
          MINUTES_IN_HOUR *
          SECONDS_IN_MINUTE *
          MILLISECONDS_IN_SECOND
        );
      case "hours":
        return (
          initialTime *
          MINUTES_IN_HOUR *
          SECONDS_IN_MINUTE *
          MILLISECONDS_IN_SECOND
        );
      case "minutes":
        return initialTime * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
      case "seconds":
        return initialTime * MILLISECONDS_IN_SECOND;
      default:
        return initialTime;
    }
  }, [initialTime, unit]);

  const [timeInMs, setTimeInMs] = useState(initialMs);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(!autoStart);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning && timeInMs > 0) {
      intervalId = setInterval(() => {
        setTimeInMs((prevTime) => {
          if (prevTime <= 100) {
            // Less than 100ms left
            setIsRunning(false);
            return 0;
          }
          return prevTime - 100; // Update every 100ms for smoother countdown
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeInMs]);

  // Calculate time units
  const timeValues = useMemo(() => {
    const totalSeconds = Math.floor(timeInMs / MILLISECONDS_IN_SECOND);
    const totalMinutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
    const totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
    const totalDays = Math.floor(totalHours / HOURS_IN_DAY);

    const ms = timeInMs % MILLISECONDS_IN_SECOND;
    const seconds = totalSeconds % SECONDS_IN_MINUTE;
    const minutes = totalMinutes % MINUTES_IN_HOUR;
    const hours = totalHours % HOURS_IN_DAY;
    const days = totalDays;

    // Create formatted string based on format options
    const parts: string[] = [];
    if (format.showDays && days > 0) parts.push(`${days}d`);
    if (format.showHours && (hours > 0 || parts.length > 0))
      parts.push(`${hours}h`);
    if (format.showMinutes && (minutes > 0 || parts.length > 0))
      parts.push(`${minutes}m`);
    if (format.showSeconds && (seconds > 0 || parts.length > 0))
      parts.push(`${seconds}s`);
    if (format.showMilliseconds && (ms > 0 || parts.length > 0))
      parts.push(`${ms}ms`);

    return {
      milliseconds: ms,
      seconds,
      minutes,
      hours,
      days,
      formatted: parts.join(" ") || "0ms",
      isRunning,
      isPaused,
      start: () => {
        setIsRunning(true);
        setIsPaused(false);
      },
      pause: () => {
        setIsRunning(false);
        setIsPaused(true);
      },
      reset: () => {
        setTimeInMs(initialMs);
        setIsRunning(autoStart);
        setIsPaused(!autoStart);
      },
    };
  }, [timeInMs, format, isRunning, isPaused, initialMs, autoStart]);

  return timeValues;
}
