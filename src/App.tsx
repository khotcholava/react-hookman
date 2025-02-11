import "./App.css";
import { useCountdown } from "./hooks";

function App() {
  // Example 1: Pass time in milliseconds
  const timer = useCountdown(5, "minutes", {
    showMinutes: true,
    showSeconds: true,
  });

  return (
    <div>
      <p>Time remaining: {timer.formatted}</p>
      <p>Minutes: {timer.minutes}</p>
      <p>Seconds: {timer.seconds}</p>

      <button onClick={timer.start} disabled={timer.isRunning}>
        Start
      </button>
      <button onClick={timer.pause} disabled={timer.isPaused}>
        Pause
      </button>
      <button onClick={timer.reset}>Reset</button>
    </div>
  );
}
export default App;
