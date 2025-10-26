import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // no .tsx needed
import "./index.css";    // Tailwind must be imported here

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
