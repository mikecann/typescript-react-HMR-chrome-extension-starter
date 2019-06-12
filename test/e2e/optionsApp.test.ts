import { PuppeteerTools } from "./utils/PuppeteerTools";
import { TestFramework } from "./utils/TestFramework";
import { ExtensionModel } from "./models/ExtensionModel";
import { OptionsApp } from "../../src/options/OptionsApp";

const tools = new PuppeteerTools();
const testing = new TestFramework(tools);
const extension = new ExtensionModel(tools);

testing.beforeEach(async () => {
  // Do something
});

testing.describe("options app", () => {
  const app = tools.model(OptionsApp);

  testing.it("should allow a user to to signup as new", async () => {
    await extension.openPage("options");
    await app.id.waitFor();
  });
});
