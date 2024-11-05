import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Leva } from "leva";
import { ConfiguratorProvider } from "./Contexts/Configurator.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfiguratorProvider>
      <App />
      <Leva />
    </ConfiguratorProvider>
  </React.StrictMode>
);
