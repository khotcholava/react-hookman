import { useEffect, useRef } from "react";

// // Child component that uses useDestroy
// const ChildComponent = () => {
//   useDestroy(() => {
//     console.log("Child component is being destroyed!");
//     // Cleanup operations can go here
//     // For example: clearing intervals, closing connections, etc.
//   });

//   return (
//     <div
//       style={{ padding: "20px", backgroundColor: "#f0f0f0", margin: "20px 0" }}
//     >
//       <h3>Child Component</h3>
//       <p>This component will log a message when unmounted</p>
//     </div>
//   );
// };

// function App() {
//   const [showChild, setShowChild] = useState(true);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>useDestroy Hook Demo</h2>

//       <button
//         onClick={() => setShowChild((prev) => !prev)}
//         style={{ marginBottom: "20px" }}
//       >
//         {showChild ? "Destroy Child" : "Show Child"}
//       </button>

//       {showChild && <ChildComponent />}

//       <div style={{ marginTop: "20px" }}>
//         <p>Open the console to see the destruction message</p>
//         <p>Click the button above to toggle the child component</p>
//       </div>
//     </div>
//   );
// }
export function useDestroy(func: () => void) {
  const functionRef = useRef(func);

  functionRef.current = func;

  useEffect(
    () => () => {
      functionRef.current();
    },
    []
  );
}
