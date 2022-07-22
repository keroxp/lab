import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
function main() {
  const v = createRoot(document.getElementById("root")!);
  v.render(React.createElement(App, {}));
}
main();
