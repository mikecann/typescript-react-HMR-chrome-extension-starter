import * as React from "react";
import { render } from "react-dom";
import { HotOptionsApp } from "./OptionsApp";

const root = document.createElement("div");
document.body.appendChild(root);

render(<HotOptionsApp />, root);
