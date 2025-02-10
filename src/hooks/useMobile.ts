import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

/**
 * 
 * function App() {
  const isMobile = useMobile();

  return <div>{isMobile ? "Mobile!" : "Desktop!"}</div>;
}
 */

export function useMobile() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const debouncedWidth = useDebounce(width, 100);

  return debouncedWidth < 768;
}
