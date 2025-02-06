import { useRef } from "react";
import "./App.css";
import { useHover } from "./hooks";

function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(elementRef);

  return <div ref={elementRef}>{isHovered ? "Hovered!" : "Hover me!"}</div>;
}
export default App;
