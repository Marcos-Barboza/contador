import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const MAX_COUNTER_VALUE = 359999;

interface CounterState {
  currentValue?: number;
  notificationValue: number;
  isNotification: boolean;
  isTimerReverse: boolean;
  isTimerRunning: boolean;
  isTimerMode: boolean;
  isEditMode: boolean;
}

const initialState: CounterState = {
  currentValue: 0,
  notificationValue: 0,
  isNotification: false,
  isTimerReverse: false,
  isTimerRunning: false,
  isTimerMode: false,
  isEditMode: false,
};

const checkNotification = (state: CounterState, value: number) => {
  if (state.notificationValue <= 0) return;
  const intervalInSeconds = state.notificationValue * 60;
  state.isNotification = value > 0 && value % intervalInSeconds === 0;
};

const toDisplayFormat = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return h * 10000 + m * 100 + s;
};

const toTotalSeconds = (raw: number) => {
  const str = raw.toString().padStart(6, "0");
  const h = parseInt(str.slice(0, 2)) * 3600;
  const m = parseInt(str.slice(2, 4)) * 60;
  const s = parseInt(str.slice(4, 6));
  return Math.min(h + m + s, MAX_COUNTER_VALUE);
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeNotificationValue: (state, action: PayloadAction<number>) => {
      state.notificationValue = action.payload;
    },
    changeEditMode: (state) => {
      const enteringEdit = !state.isEditMode;

      if (enteringEdit) {
        if (state.isTimerMode && state.currentValue) {
          state.currentValue = toDisplayFormat(state.currentValue);
        }
        state.isTimerRunning = false;
      } else {
        if (state.isTimerMode && state.currentValue !== undefined) {
          state.currentValue = toTotalSeconds(state.currentValue);
          state.isTimerRunning = true;
        }
      }

      state.isEditMode = enteringEdit;
    },
    changeReverseTimer: (state) => {
      state.isTimerReverse = !state.isTimerReverse;
    },
    startTimer: (state) => {
      state.isTimerRunning = true;
      state.isTimerMode = true;
    },
    stopTimer: (state) => {
      state.isTimerRunning = false;
      state.isTimerMode = false;
    },
    setInitialValue: (state, action: PayloadAction<number | undefined>) => {
      const isValidLength = action.payload
        ? action.payload.toString().length <= 6
        : false;

      if (!action.payload || isValidLength) {
        state.currentValue = action.payload;
      }
    },
    increment: (state) => {
      if (state.currentValue && state.currentValue >= MAX_COUNTER_VALUE) {
        state.currentValue = MAX_COUNTER_VALUE;
        return;
      }
      const nextValue = (state.currentValue ?? 0) + 1;
      state.currentValue = nextValue;
      checkNotification(state, nextValue);
    },
    decrement: (state) => {
      if (!state.currentValue || state.currentValue <= 0) return;
      const nextValue = state.currentValue - 1;
      state.currentValue = nextValue;
      checkNotification(state, nextValue);
    },
    reset: (state) => {
      state.currentValue = 0;
      state.isNotification = false;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
