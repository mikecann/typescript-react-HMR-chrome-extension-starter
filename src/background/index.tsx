import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { config } from "../common/config";

console.log("Background starting up", { config });

const root = document.createElement("div");
document.body.appendChild(root);

render(<App />, root);
