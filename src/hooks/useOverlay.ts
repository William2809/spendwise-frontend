import { useState, useCallback } from "react";

export function useOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  const showOverlay = useCallback(() => setIsVisible(true), []);
  const hideOverlay = useCallback(() => setIsVisible(false), []);

  return {
    isVisible,
    showOverlay,
    hideOverlay,
  };
}