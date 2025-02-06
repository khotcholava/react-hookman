import { useEffect, useState } from "react";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     console.log("Searching for:", debouncedSearchTerm);
//   }, [debouncedSearchTerm]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>useDebounce Hook Demo</h2>

//       <div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Type to search..."
//           style={{ padding: "8px", width: "200px" }}
//         />
//       </div>

//       <div style={{ marginTop: "20px" }}>
//         <p>Current value: {searchTerm}</p>
//         <p>Debounced value: {debouncedSearchTerm}</p>
//       </div>
//     </div>
//   );
// }

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debounceValue;
}
