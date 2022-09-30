import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiProvider } from "@elastic/eui";
import "./icons";

ReactDOM.render(
  <React.StrictMode>
    <EuiProvider colorMode="light">
      <App />
    </EuiProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
