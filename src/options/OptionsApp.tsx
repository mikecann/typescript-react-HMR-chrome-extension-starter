import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Counter } from "../common/Counter";
import { ids } from "../lib/utils/ids";

export function OptionsApp() {
  return (
    <div data-test-id={OptionsApp.ids.id}>
      <h1>Hello from the Options!</h1>
      <p>You can update this text, and it will work!</p>
      <p>
        <Counter />
      </p>
    </div>
  );
}

OptionsApp.ids = ids("options-app", []);

export const HotOptionsApp = hot(OptionsApp);
