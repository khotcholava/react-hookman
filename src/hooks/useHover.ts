import { RefObject, useEffect, useState } from "react";

export function useHover<T extends HTMLElement | null>(
  ref: RefObject<T> | null
): boolean {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const node = ref?.current;

    if (node) {
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);

      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [ref]);

  return isHovered;
}
