import type { SelectChangeEvent } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { counterActions } from "../store";

export const useCounterSettings = () => {
  const dispatch = useAppDispatch();

  const isEditMode = useAppSelector((state) => state.counter.isEditMode);

  const isTimerReverse = useAppSelector(
    (state) => state.counter.isTimerReverse,
  );

  const notificationValue = useAppSelector(
    (state) => state.counter.notificationValue,
  );

  return {
    isEditMode,
    isTimerReverse,
    notificationValue,
    changeReverseTimer: () => dispatch(counterActions.changeReverseTimer()),
    changeEditMode: () => dispatch(counterActions.changeEditMode()),
    changeNotificationValue: (e: SelectChangeEvent<number>) =>
      dispatch(counterActions.changeNotificationValue(Number(e.target.value))),
  };
};
