import { useState, useEffect } from "react";

/**
 * 
  function App() {
  const scrollPosition = useScrollPosition();

  return (
    <div>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <div>Scroll Position: {scrollPosition}px</div>
      </header>
      <main style={{ marginTop: "5rem" }}>
        <div style={{ height: "200vh", padding: "2rem" }}>
          <p>
            Scroll down to see the scroll position update dynamically in the
            header.
          </p>
          <p>
            This is just sample content to make the page tall enough for
            scrolling.
          </p>
        </div>
      </main>
    </div>
  );
}
 */

export function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking = false;
        });
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
}
