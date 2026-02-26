import { Box } from "@mui/material";
import { useCounterDisplay } from "../hooks";
import CounterBlinkCursor from "./CounterBlinkCursor";

const CounterDisplay = () => {
  const {
    currentValue,
    isEditMode,
    rawValue,
    hiddenInputRef,
    keepFocus,
    exitEditMode,
    changeCurrentValue,
  } = useCounterDisplay();

  return (
    <Box
      className="relative flex justify-center items-center w-full"
      onClick={() => isEditMode && hiddenInputRef.current?.focus()}
    >
      {isEditMode && (
        <input
          ref={hiddenInputRef}
          type="tel"
          value={rawValue}
          onChange={changeCurrentValue}
          onKeyDown={exitEditMode}
          onBlur={keepFocus}
          className="absolute inset-0 opacity-0 z-10"
        />
      )}

      <Box className="flex gap-2 justify-center">
        {!currentValue && isEditMode ? (
          <CounterBlinkCursor />
        ) : (
          currentValue?.map((item, index) => {
            const isLastDigit = index === currentValue.length - 1;
            return (
              <Box key={index} className="flex items-center">
                <span
                  className={`text-5xl md:text-7xl ${item.isEven ? "text-green-600" : "text-slate-800"}`}
                >
                  {item.digit}
                </span>
                {isEditMode && isLastDigit && <CounterBlinkCursor />}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default CounterDisplay;
