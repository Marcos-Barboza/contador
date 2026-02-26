import React from "react";
import { Toaster } from "sonner";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
      <Toaster richColors position="top-right" />
    </StyledEngineProvider>
  </React.StrictMode>,
);
