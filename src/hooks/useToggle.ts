import { useState } from "react";

/**
 * A custom hook to manage a boolean state with a toggle function.
 * 
 * Usage:
 * function App() {
  const [isOn, toggle] = useToggle(false);
  return (
    <div>
      <p>{isOn ? "ON" : "OFF"}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
 *
 * @param initialValue - The initial value of the boolean state (default: false).
 * @returns A tuple containing the current state and a function to toggle it.
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue((prevValue) => !prevValue);

  return [value, toggle];
}
