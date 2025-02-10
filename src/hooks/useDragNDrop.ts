import { useState, useRef, useEffect } from "react";

/**
 * function App() {
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
 */

interface Offset {
  x: number;
  y: number;
}

export function useDragAndDrop<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean
] {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (elementRef.current && elementRef.current.contains(e.target as Node)) {
        setIsDragging(true);
        setOffset({
          x: e.clientX - elementRef.current.offsetLeft,
          y: e.clientY - elementRef.current.offsetTop,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && elementRef.current) {
        const x = e.clientX - offset.x;
        const y = e.clientY - offset.y;

        elementRef.current.style.left = `${x}px`;
        elementRef.current.style.top = `${y}px`;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return [elementRef, isDragging];
}
