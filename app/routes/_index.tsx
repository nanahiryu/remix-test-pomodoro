import type { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import { BaseButton } from "~/components/button";
import { Timer } from "~/types/timer";
export const meta: MetaFunction = () => {
  return [
    { title: "Pomodoro Timer" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [timer, setTimer] = useState<Timer>({ minute: 20, second: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (timer.minute === 0 && timer.second === 0) {
      setIsRunning(false);
    }
    console.log("timer", timer);
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev.second === 0) {
            return { minute: prev.minute - 1, second: 59 };
          }
          return { minute: prev.minute, second: prev.second - 1 };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const toggleRun = () => {
    setIsRunning((prev) => !prev);
  };
  return (
    <div className="flex flex-col justify-center align-center h-screen gap-4">
      <div className="flex justify-center align-center text-9xl">
        <h1 className="text-red-300">
          {timer.minute.toString().padStart(2, "0")}
        </h1>
        <h1 className="text-red-300">:</h1>
        <h1 className="text-red-300">
          {timer.second.toString().padStart(2, "0")}
        </h1>
      </div>
      <div className="flex justify-center align-center">
        <BaseButton onClick={toggleRun}>
          {isRunning ? "stop" : "start"}
        </BaseButton>
      </div>
    </div>
  );
}
