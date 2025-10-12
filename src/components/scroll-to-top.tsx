"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Effect to handle button visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Run once to set initial state
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Tailwind transition: will animate opacity and translateY for smooth in/out
  // When not visible we keep it in the DOM but visually hidden to allow transition
  const baseClasses = `fixed bottom-7 right-7 z-50 transition-transform transition-opacity duration-300 ease-in-out
rounded-full p-2 bg-background/80 backdrop-blur-md shadow-md text-muted-foreground hover:outline-none hover:ring-2 hover:ring-ring cursor-pointer
    `;
  const visibleClasses = "opacity-100 translate-y-0";
  const hiddenClasses = "opacity-0 translate-y-4 pointer-events-none";

  return (
    <div aria-hidden={!isVisible}>
      <ArrowUp
        size={50}
        onClick={scrollToTop}
        className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`}
      />
    </div>
  );
}
