import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { counterActions, counterSelectors, MAX_COUNTER_VALUE } from "../store";

export const useCounterDisplay = () => {
  const dispatch = useAppDispatch();

  const currentValue = useAppSelector(counterSelectors.selectCounterValue);
  const isEditMode = useAppSelector((state) => state.counter.isEditMode);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const rawValue = currentValue
    ?.filter((item) => item.digit !== ":")
    .map((item) => item.digit)
    .join("");

  const keepFocus = () => {
    if (isEditMode) hiddenInputRef.current?.focus();
  };

  const exitEditMode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      dispatch(counterActions.changeEditMode());
    }
  };

  const changeCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || undefined;
    if (value && value > MAX_COUNTER_VALUE) {
      toast.error(`Valor máximo permitido é ${MAX_COUNTER_VALUE}`, {
        id: "max-value-error",
      });
    } else {
      dispatch(counterActions.setInitialValue(value));
    }
  };

  useEffect(() => {
    if (isEditMode) hiddenInputRef.current?.focus();
  }, [isEditMode]);

  return {
    rawValue,
    currentValue,
    isEditMode,
    hiddenInputRef,
    keepFocus,
    exitEditMode,
    changeCurrentValue,
  };
};
