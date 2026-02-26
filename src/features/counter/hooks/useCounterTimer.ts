import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { counterActions } from "../store";

export const useCounterTimer = () => {
  const dispatch = useAppDispatch();

  const isEditMode = useAppSelector((state) => state.counter.isEditMode);
  const isTimerMode = useAppSelector((state) => state.counter.isTimerMode);

  const timerIsRunning = useAppSelector(
    (state) => state.counter.isTimerRunning,
  );
  const isTimerReverse = useAppSelector(
    (state) => state.counter.isTimerReverse,
  );

  useEffect(() => {
    if (!timerIsRunning) return;

    const counterInterval = setInterval(() => {
      dispatch(
        isTimerReverse
          ? counterActions.decrement()
          : counterActions.increment(),
      );
    }, 1000);

    return () => clearInterval(counterInterval);
  }, [isTimerReverse, timerIsRunning, dispatch]);

  return {
    isTimerMode,
    isEditMode,
    timerIsRunning,
    toggleTimer: () =>
      dispatch(
        timerIsRunning
          ? counterActions.stopTimer()
          : counterActions.startTimer(),
      ),
    increment: () => dispatch(counterActions.increment()),
    decrement: () => dispatch(counterActions.decrement()),
    reset: () => dispatch(counterActions.reset()),
  };
};
