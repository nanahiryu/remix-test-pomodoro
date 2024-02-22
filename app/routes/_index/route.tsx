import type { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import { BaseButton } from "~/components/button";
import { Mode, displayModeColor } from "~/const/mode";
import { Timer } from "~/types/timer";
import ModeChanger from "./ModeChanger";
export const meta: MetaFunction = () => {
  return [
    { title: "Pomodoro Timer" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const defaultPomodoroMin = 25;
  const defaultShortBreakMin = 5;
  const defaultLongBreakMin = 15;

  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timer, setTimer] = useState<Timer>({
    minute: defaultPomodoroMin,
    second: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (timer.minute === 0 && timer.second === 0) {
      setIsRunning(false);
    }
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
  const changeMode = (mode: Mode) => {
    setMode(mode);
    switch (mode) {
      case "pomodoro":
        setTimer({ minute: defaultPomodoroMin, second: 0 });
        break;
      case "shortBreak":
        setTimer({ minute: defaultShortBreakMin, second: 0 });
        break;
      case "longBreak":
        setTimer({ minute: defaultLongBreakMin, second: 0 });
        break;
    }
    setIsRunning(false);
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-4 w-[30rem] border rounded p-8">
        <ModeChanger mode={mode} changeMode={changeMode} />
        <div className="flex justify-center content-center text-9xl">
          <p className={displayModeColor(mode)}>
            {timer.minute.toString().padStart(2, "0")}
          </p>
          <p className={displayModeColor(mode)}>:</p>
          <p className={displayModeColor(mode)}>
            {timer.second.toString().padStart(2, "0")}
          </p>
        </div>
        <div className="flex justify-center content-center w-full">
          <BaseButton w="full" onClick={toggleRun}>
            {isRunning ? "stop" : "start"}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
