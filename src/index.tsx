import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();

window.LogR = function (...args) {
  if (window.__DEV__) {
    console.log("%c%s", "color: red;font-weight:bold;font-size:25px", ...args);
  }
};
