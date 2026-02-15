/**
 * Entry point — mounts the React app to the DOM.
 * Tailwind styles are imported via index.css (design tokens defined there).
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
