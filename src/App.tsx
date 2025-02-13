import "./App.css";

import { useState } from "react";
import { useLongPress } from "./hooks";

// Basic Button Example
const BasicButton = () => {
  const [status, setStatus] = useState("Idle");

  const handlers = useLongPress(
    () => {
      setStatus("Long Press Activated!");
    },
    {
      threshold: 1000,
      onStart: () => setStatus("Pressing..."),
      onCancel: () => setStatus("Press Cancelled"),
      onFinish: () => setTimeout(() => setStatus("Idle"), 1000),
    }
  );

  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" {...handlers}>
      {status}
    </button>
  );
};

// Delete Confirmation Example
const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlers = useLongPress(
    () => {
      setIsDeleting(true);
      onDelete();
    },
    {
      threshold: 2000,
      onStart: () => {
        setProgress(0);
        const startTime = Date.now();
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const newProgress = Math.min((elapsed / 2000) * 100, 100);
          setProgress(newProgress);

          if (elapsed < 2000 && !isDeleting) {
            requestAnimationFrame(updateProgress);
          }
        };
        requestAnimationFrame(updateProgress);
      },
      onCancel: () => {
        setProgress(0);
        setIsDeleting(false);
      },
    }
  );

  return (
    <div className="relative inline-block">
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        {...handlers}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleted!" : "Hold to Delete"}
      </button>
      {progress > 0 && progress < 100 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-red-300 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

// Interactive Card Example
const DraggableCard = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlers = useLongPress(() => setIsDragging(true), {
    threshold: 500,
    moveThreshold: 50,
    onMove: (_, pos) => {
      if (isDragging) {
        setPosition(pos);
      }
    },
    onFinish: () => setIsDragging(false),
    onCancel: () => setIsDragging(false),
  });

  return (
    <div
      {...handlers}
      className={`p-4 rounded shadow-lg cursor-grab ${
        isDragging ? "bg-blue-100 shadow-xl scale-105" : "bg-white"
      } transition-all`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        userSelect: "none",
      }}
    >
      <h3>Hold and Drag</h3>
      <p>
        Position: {Math.round(position.x)}, {Math.round(position.y)}
      </p>
    </div>
  );
};

// Main Demo Component
export const LongPressDemo = () => {
  const handleDelete = () => {
    console.log("Item deleted!");
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-xl mb-4">Basic Long Press</h2>
        <BasicButton />
      </div>

      <div>
        <h2 className="text-xl mb-4">Delete with Progress</h2>
        <DeleteButton onDelete={handleDelete} />
      </div>

      <div>
        <h2 className="text-xl mb-4">Interactive Card</h2>
        <DraggableCard />
      </div>
    </div>
  );
};

function App() {
  return <LongPressDemo />;
}
export default App;
