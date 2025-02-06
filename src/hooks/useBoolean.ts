import { useState, useCallback } from "react";

/**
 * const { value, setTrue, setFalse, toggle } = useBoolean(false);
  return (
    <div style={{ padding: "20px" }}>
      <h2>useBoolean Hook Demo</h2>

      <div style={{ marginBottom: "20px" }}>
        <p>Current value: {value.toString()}</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={toggle}>Toggle</button>
        <button onClick={setTrue}>Set True</button>
        <button onClick={setFalse}>Set False</button>
      </div>

      {value && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#e0e0e0",
          }}
        >
          This content is visible when value is true!
        </div>
      )}
    </div>
  );
 */

interface UseBooleanOutput {
  value: boolean;
  setValue: (value: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export const useBoolean = (initialValue: boolean = false): UseBooleanOutput => {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
};
