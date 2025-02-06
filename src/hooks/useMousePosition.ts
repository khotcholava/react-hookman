import { useLayoutEffect, useRef, useState } from "react";

// import { useMousePosition } from "./hooks/useMousePosition";

// function App() {
//   const [position, ref] = useMousePosition<HTMLDivElement>();

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Mouse Position Tracker</h2>

//       {/* Global mouse position */}
//       <div style={{ marginBottom: "20px" }}>
//         <h3>Global Mouse Position:</h3>
//         <p>X: {position.x}</p>
//         <p>Y: {position.y}</p>
//       </div>

//       {/* Tracked element */}
//       <div
//         ref={ref}
//         style={{
//           width: "300px",
//           height: "300px",
//           backgroundColor: "#f0f0f0",
//           border: "2px solid #333",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <h3>Mouse Position Relative to This Box:</h3>
//         <p>Element X: {position.elementX?.toFixed(0)}</p>
//         <p>Element Y: {position.elementY?.toFixed(0)}</p>

//         {/* Visual indicator of mouse position */}
//         {position.elementX !== undefined && position.elementY !== undefined && (
//           <div
//             style={{
//               position: "absolute",
//               width: "10px",
//               height: "10px",
//               backgroundColor: "red",
//               borderRadius: "50%",
//               transform: `translate(${position.elementX - 5}px, ${
//                 position.elementY - 5
//               }px)`,
//               pointerEvents: "none",
//             }}
//           />
//         )}
//       </div>

//       {/* Element position on page */}
//       <div style={{ marginTop: "20px" }}>
//         <h3>Element Position on Page:</h3>
//         <p>Position X: {position.elementPositionX}</p>
//         <p>Position Y: {position.elementPositionY}</p>
//       </div>
//     </div>
//   );
// }

export type Position = {
  x: number;
  y: number;
  elementX?: number;
  elementY?: number;
  elementPositionX?: number;
  elementPositionY?: number;
};

export function useMousePosition<T extends HTMLElement>(): [
  Position,
  React.Ref<T>
] {
  const [state, setState] = useState<Position>({
    x: 0,
    y: 0,
  });

  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState: Position = {
        x: event.pageX,
        y: event.pageY,
      };

      if (ref.current?.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
        newState.elementX = elementX;
        newState.elementY = elementY;
      }

      setState((s) => ({ ...s, ...newState }));
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return [state, ref];
}
