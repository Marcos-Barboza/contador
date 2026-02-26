import { createAppSelector } from "../../../store/hooks";

const formatTimeString = (totalSeconds: number, showHours: boolean) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");

  return showHours ? `${h}:${m}:${s}` : `${m}:${s}`;
};

export const counterSelectors = {
  selectCounterValue: createAppSelector(
    [
      (state) => state.counter.currentValue,
      (state) => state.counter.isTimerRunning,
      (state) => state.counter.isTimerMode,
      (state) => state.counter.isEditMode,
    ],
    (totalSeconds, isTimerRunning, isTimerMode, isEditMode) => {
      if (totalSeconds === undefined && !isEditMode && !isTimerMode)
        return undefined;

      const value = totalSeconds ?? 0;

      let timeString: string;

      if (isEditMode && isTimerMode) {
        const raw = value.toString().padStart(6, "0");
        timeString = `${raw.slice(0, 2)}:${raw.slice(2, 4)}:${raw.slice(4, 6)}`;
      } else if (isTimerRunning || isTimerMode) {
        const showHours = Math.floor(value / 3600) > 0;
        timeString = formatTimeString(value, showHours);
      } else {
        timeString = value.toString();
      }

      return timeString.split("").map((char) => {
        if (char === ":") return { digit: char, isEven: false };
        const digit = parseInt(char);
        return { digit, isEven: digit % 2 === 0 };
      });
    },
  ),
};
