import { Box, Button } from "@mui/material";
import { useCounterTimer } from "../hooks";

const CounterControls = () => {
  const {
    isEditMode,
    timerIsRunning,
    increment,
    decrement,
    reset,
    toggleTimer,
  } = useCounterTimer();

  return (
    <Box className="flex flex-col gap-4 w-full">
      <Box className="flex gap-2">
        <Button
          disabled={isEditMode}
          variant="outlined"
          color="error"
          className="flex-1"
          onClick={decrement}
        >
          -
        </Button>
        <Button
          disabled={isEditMode}
          color="success"
          variant="outlined"
          className="flex-1"
          onClick={increment}
        >
          +
        </Button>
        <Button
          disabled={isEditMode}
          variant="outlined"
          color="error"
          onClick={reset}
        >
          Reset
        </Button>
      </Box>

      <Button
        disabled={isEditMode}
        color={timerIsRunning ? "error" : "primary"}
        variant="contained"
        fullWidth
        size="large"
        onClick={toggleTimer}
      >
        {timerIsRunning ? "Parar Timer" : "Iniciar Timer"}
      </Button>
    </Box>
  );
};

export default CounterControls;
