import "./App.css";
import { useToggle } from "./hooks";

function App() {
  const [isOn, toggle] = useToggle(false);
  return (
    <div>
      <p>{isOn ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default App;
