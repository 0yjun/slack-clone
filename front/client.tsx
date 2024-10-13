import React from "react";
import ReactDOM from "react-dom";
import App from "@layouts/App"; // 애플리케이션의 메인 컴포넌트

import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
if (container == null) {
  console.log("react init error in client.tsx");
} else {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
}
