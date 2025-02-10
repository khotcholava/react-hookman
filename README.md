# React Hookman

A collection of reusable and type-safe React hooks to simplify your development workflow.

## Installation

```bash
npm install react-hookman
```

## Usage

## or

```bash
yarn add react-hookman
```

## Available Hooks

### useBoolean

### useClickOutside

### useClipboard

### useDebounce

### useDestroy

### useFetch

### useHover

### useMousePosition

### usePageTitle

### useToggle

### useTruncate

### useWindowSize

example:
useBoolean

```tsx
const { value, setTrue, setFalse, toggle } = useBoolean(false);
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
```

example:
useClickOutside

```tsx
const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            background: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
          ref={modalRef}
        >
          <p>This is a modal. Click outside to close.</p>
        </div>
      )}
    </div>
  );
};
```

# 📋 `useClipboard` Hook

A **React hook** for copying text to the clipboard with both **Clipboard API** and **fallback support**. It also provides a `copied` state to track copy status.

---

## 🔧 Usage

```tsx
import React, { useState } from "react";
import { useClipboard } from "./useClipboard";

const ClipboardExample: React.FC = () => {
  const { copied, copyToClipboard } = useClipboard();
  const [text, setText] = useState("Hello, World!");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to copy"
      />
      <button onClick={() => copyToClipboard(text)}>
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default ClipboardExample;
```

# ⏳ `useDebounce` Hook

A **React hook** for debouncing values. It delays updating the state until after a specified time has passed since the last change.

---

## 🔧 Usage

```tsx
import React, { useState } from "react";
import { useDebounce } from "./useDebounce";

const DebounceExample: React.FC = () => {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>Debounced Value: {debouncedText}</p>
    </div>
  );
};

export default DebounceExample;
```

# 🛠 API

`useDebounce<T>(value: T, delay?: number): T`

Returns the debounced value after the specified delay.

| Parameter | Type   | Default | Description                                    |
| --------- | ------ | ------- | ---------------------------------------------- |
| value     | T      | —       | The value to debounce.                         |
| delay     | number | 500     | The debounce delay in milliseconds (optional). |

# 🛑 `useDestroy` Hook

A **React hook** that runs a cleanup function when a component **unmounts**. Useful for handling cleanup logic like removing event listeners, aborting requests, or clearing intervals.

---

## 🔧 Usage

```tsx
import React, { useState } from "react";
import { useDestroy } from "./useDestroy";

const DestroyExample: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Unmount Component" : "Mount Component"}
      </button>
      {visible && <ChildComponent />}
    </div>
  );
};

const ChildComponent: React.FC = () => {
  useDestroy(() => {
    console.log("Component unmounted! Cleanup logic here.");
  });

  return <p>This component will trigger cleanup on unmount.</p>;
};

export default DestroyExample;
```

# 🛠 API

`useDestroy(func: () => void)`

Runs the provided function when the component unmounts.

| Parameter | Type       | Description                                         |
| --------- | ---------- | --------------------------------------------------- |
| func      | () => void | The function to execute when the component unmounts |

# 🌐 `useFetch` Hook

A **custom React hook** for fetching data asynchronously with built-in support for **loading state, error handling, retries, and aborting requests**.

---

## 🚀 Installation

This is a standalone hook. You can directly copy and use it in your React project.

---

## 🔧 Usage

```tsx
import React, { useState } from "react";
import { useFetch } from "./useFetch";

const FetchExample: React.FC = () => {
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  const { data, loading, error, retry } = useFetch<{
    title: string;
    body: string;
  }>(url);

  return (
    <div>
      <h2>Fetch Example</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
      <button onClick={retry}>Retry</button>
      <button
        onClick={() => setUrl("https://jsonplaceholder.typicode.com/posts/2")}
      >
        Fetch Another Post
      </button>
    </div>
  );
};

export default FetchExample;
```

## 🛠 API

### `useFetch<T>(url: string, options?: FetchOptions): UseFetchReturn<T>`

#### Parameters

| Parameter | Type         | Description                                       |
| --------- | ------------ | ------------------------------------------------- |
| url       | string       | The API endpoint to fetch data from               |
| options   | FetchOptions | Fetch configuration (headers, method, body, etc.) |

#### FetchOptions (Extends RequestInit)

| Option  | Type    | Default | Description                      |
| ------- | ------- | ------- | -------------------------------- |
| enabled | boolean | true    | If false, prevents auto-fetching |

#### Return Values

| Property | Type          | Description                               |
| -------- | ------------- | ----------------------------------------- |
| data     | T \| null     | The fetched data. Defaults to null        |
| loading  | boolean       | true while fetching, false when complete  |
| error    | Error \| null | Contains error details if the fetch fails |
| retry    | () => void    | A function to manually retry the request  |

# 🖱️ `useHover` Hook

A custom React hook that detects whether an element is being hovered over. It returns a boolean value indicating the hover state.

---

## 🔧 Usage

```tsx
import { useRef } from "react";
import { useHover } from "./useHover";

function Component() {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: isHovered ? "lightblue" : "white" }}
    >
      Hover over me!
    </div>
  );
}
```

# 🛠 API

### `useHover<T extends HTMLElement | null>(ref: RefObject<T> | null): boolean`

#### Parameters

| Parameter | Type         | Description |
| --------- | ------------ | ----------- | ---------------------------------------------- |
| ref       | RefObject<T> | null        | A React ref object pointing to an HTMLElement. |

#### Return Value

Type Description
boolean true if the element is hovered, false otherwise.
Type Parameters
T extends HTMLElement | null: The type of element the ref refers to (automatically inferred).
