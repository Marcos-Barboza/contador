import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Paper, Box } from "@mui/material";

import { useAppSelector } from "../../store/hooks";

import CounterControls from "./components/CounterControls";
import CounterDisplay from "./components/CounterDisplay";
import CounterSettings from "./components/CounterSettings";

export const Counter = () => {
  const notificationValue = useAppSelector(
    (state) => state.counter.notificationValue,
  );
  const isNotification = useAppSelector(
    (state) => state.counter.isNotification,
  );

  const alertSound = useRef(
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2820/2820-preview.mp3",
    ),
  );

  useEffect(() => {
    if (!notificationValue) return;

    if (isNotification && Notification.permission === "granted") {
      alertSound.current.pause();
      alertSound.current.play();

      new Notification("Contador", {
        body: "Intervalo atingido!",
        tag: "checkpoint",
      });
    } else if (Notification.permission === "default") {
      toast("Permita as notificações para receber alertas!", {
        id: "notification-permission",
      });

      Notification.requestPermission();
    }
  }, [isNotification, notificationValue]);

  return (
    <Box className="h-screen w-screen p-5 flex items-center justify-center">
      <Paper className="flex flex-col gap-10 p-8 m-5 w-full max-w-lg min-w-full md:min-w-0">
        <CounterSettings />
        <CounterDisplay />
        <CounterControls />
      </Paper>
    </Box>
  );
};
