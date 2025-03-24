import { useEffect } from "react";

const useBeforeUnload = (isGameOngoing: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isGameOngoing) {
        event.preventDefault();
      }
    };
    // Attach event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);
     // Cleanup event listener when the component unmounts or dependency changes
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isGameOngoing]);
};

export default useBeforeUnload;