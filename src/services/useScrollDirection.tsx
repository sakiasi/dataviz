import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < prevScrollPos) {
        setScrollDirection("up");
        // CALL YOUR FUNCTION HERE WHEN SCROLLING UP
        // e.g., myScrollUpFunction();
      } else if (currentScrollPos > prevScrollPos) {
        setScrollDirection("down");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return scrollDirection;
};

export default useScrollDirection;