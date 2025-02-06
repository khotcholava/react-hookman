import { useEffect, RefObject } from "react";

// const Modal: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   useClickOutside(modalRef as React.RefObject<HTMLElement>, () =>
//     setIsOpen(false)
//   );

//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Open Modal</button>

//       {isOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             padding: "20px",
//             background: "white",
//             boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//             borderRadius: "8px",
//           }}
//           ref={modalRef}
//         >
//           <p>This is a modal. Click outside to close.</p>
//         </div>
//       )}
//     </div>
//   );
// };

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T> | null,
  cb: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
