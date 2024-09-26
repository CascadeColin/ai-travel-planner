import { createRoot } from "react-dom/client";

import AppRouter from "./AppRouter";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<AppRouter />);
} else {
  console.error("Root element not found");
}
