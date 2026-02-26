import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Paper, Box } from "@mui/material";

import { useAppSelector } from "../../store/hooks";

import CounterControls from "./components/CounterControls";
import CounterDisplay from "./components/CounterDisplay";
import CounterSettings from "./components/CounterSettings";

const message = {
  body: "Intervalo atingido!",
  tag: "checkpoint",
};

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
    if (!("Notification" in window)) return;

    if (isNotification && Notification.permission === "granted") {
      alertSound.current.pause();
      alertSound.current.play();

      try {
        new Notification("Contador", message);
      } catch {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Contador", message);
          });
        } else {
          toast.info(message.body, { id: message.tag });
        }
      }
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
