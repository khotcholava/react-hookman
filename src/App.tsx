import "./App.css";
import { useMobile } from "./hooks";

function App() {
  const isMobile = useMobile();

  return <div>{isMobile ? "Mobile!" : "Desktop!"}</div>;
}
export default App;
