import { useState, useEffect } from "react";

export default function useScrollActive(hideDelay = 2000) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setIsActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsActive(false), hideDelay);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [hideDelay]);

  return isActive;
}