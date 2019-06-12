import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Counter } from "../common/Counter";

const App = () => (
  <h1>
    Hello from the Browser Action!
    <br />
    You can update this text, and it will work!
    <Counter />
  </h1>
);

export default hot(App);
