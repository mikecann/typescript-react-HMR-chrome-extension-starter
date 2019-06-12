import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Counter } from "../src/common/Counter";

storiesOf("Counter", module).add("default", () => <Counter />);
