import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Counter } from "../common/Counter";

const App = () => (
  <h1>
    Hello from the Content Script!
    <br />
    Unfortunately this doent auto-update, you have to refresh the page to make it work.
    <Counter />
  </h1>
);

export default hot(App);
