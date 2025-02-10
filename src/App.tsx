import "./App.css";
import { useIdle } from "./hooks";

function App() {
  const isIdle = useIdle(10000); //

  return (
    <div style={{ color: isIdle ? "gray" : "green" }}>
      {isIdle ? "System idle ⏳" : "Active 💻"}
    </div>
  );
}
export default App;
