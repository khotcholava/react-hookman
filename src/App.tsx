import "./App.css";
import { useOnlineStatus } from "./hooks";

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
export default App;
