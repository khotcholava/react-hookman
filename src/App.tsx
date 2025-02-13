import "./App.css";
import { useMousePosition } from "./hooks/useMousePosition";

function MouseTracker() {
  const [position, ref] = useMousePosition<HTMLDivElement>();

  return (
    <div ref={ref}>
      {position.elementX !== undefined && (
        <div
          style={{
            position: "absolute",
            left: position.elementX,
            top: position.elementY,
            width: "10px",
            height: "10px",
            background: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
}

function App() {
  return <MouseTracker />;
}
export default App;
