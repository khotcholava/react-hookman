import "./App.css";
import { useDragAndDrop } from "./hooks";

function App() {
  const [ref, isDragging] = useDragAndDrop<HTMLDivElement>(); // Explicitly type the ref

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        backgroundColor: "lightblue",
        padding: "10px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      Drag me!
    </div>
  );
}
export default App;
