import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.tsx";
import "./index.css";
import { WalletProvider } from "./contexts/WalletConnect.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </WalletProvider>
);
