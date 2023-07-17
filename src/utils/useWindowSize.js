import { useEffect, useState } from "react";

function getWindowWidth() {
  const { innerWidth: width } = window;
  return { width };
}

export default function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
