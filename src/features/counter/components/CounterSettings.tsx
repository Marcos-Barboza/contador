import { Box, IconButton, MenuItem, Select, FormControl } from "@mui/material";
import { EditIcon, RotateCw, RotateCcw } from "lucide-react";

import { useCounterSettings } from "../hooks";

const options = [
  { label: "Alertar a cada", value: 0 },
  { label: "1 min", value: 1 },
  { label: "5 min", value: 5 },
  { label: "10 min", value: 10 },
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
];

const CounterSettings = () => {
  const {
    isEditMode,
    isTimerReverse,
    notificationValue,
    changeEditMode,
    changeReverseTimer,
    changeNotificationValue,
  } = useCounterSettings();

  return (
    <Box className="flex flex-nowrap items-center justify-end w-full gap-4">
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <Select value={notificationValue} onChange={changeNotificationValue}>
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton onClick={changeReverseTimer} size="small">
        {isTimerReverse ? <RotateCcw /> : <RotateCw />}
      </IconButton>

      <IconButton
        color={isEditMode ? "primary" : "default"}
        onClick={changeEditMode}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default CounterSettings;
