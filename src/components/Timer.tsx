import { useEffect } from "react";

interface TimerProps {
  isGameRunning: boolean;
  onTimeUpdate?: (time: number) => void;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Timer = ({ isGameRunning, onTimeUpdate, time, setTime }: TimerProps) => {
  useEffect(() => {
    if (!isGameRunning) return;

    const timer = setInterval(() => {
      setTime((prevTime: number) => {
        const newTime = prevTime + 1;
        if (onTimeUpdate) onTimeUpdate(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameRunning, onTimeUpdate, setTime]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">Time: {time}s</h2>
    </div>
  );
};

export default Timer;
