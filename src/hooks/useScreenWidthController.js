import { useEffect, useState, useCallback } from 'react';

export default function useScreenWidthController() {
  const getScreenWidth = useCallback(() =>
        window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleResizeScreenWidth() {
      setScreenWidth(getScreenWidth());
    };
    window.addEventListener('resize', resizeScreenWidthController, false);

    let resizeTimer;

    function resizeScreenWidthController() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          handleResizeScreenWidth();
        }, 1000);
      }
    };
    return () => 
        window.removeEventListener('resize', handleResizeScreenWidth);
  }, 
  [getScreenWidth]);

  return screenWidth;
}