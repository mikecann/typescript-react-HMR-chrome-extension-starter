import { PuppeteerTools } from "./utils/PuppeteerTools";
import { TestFramework } from "./utils/TestFramework";
import { ExtensionModel } from "./models/ExtensionModel";
import { OptionsApp } from "../../src/options/OptionsApp";
import { Counter } from "../../src/common/Counter";

const tools = new PuppeteerTools();
const testing = new TestFramework(tools);
const extension = new ExtensionModel(tools);

testing.beforeEach(async () => {
  // Do something
});

testing.describe("options app", () => {
  const app = tools.model(OptionsApp);
  const counter = tools.model(Counter);

  testing.it("should show the page", async () => {
    await extension.openPage("options");
    await app.id.waitFor();
  });

  testing.it("the counter should tick", async () => {
    await extension.openPage("options");
    await counter.id.waitFor();
    const before = await counter.id.innerText();
    await tools.waitForTime(1000);
    const after = await counter.id.innerText();
    expect(before).not.toEqual(after);
  });
});
