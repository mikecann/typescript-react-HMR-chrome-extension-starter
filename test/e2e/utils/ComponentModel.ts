import { PuppeteerTools } from "../utils/PuppeteerTools";
import { Page } from "puppeteer";
import { AbstractModel } from "./AbstractModel";

type ComponentWithIds = {
  ids: Record<string, string>;
};

type ComponentModel<T extends ComponentWithIds> = { [P in keyof T["ids"]]: ComponentPropertyModel };

export function createComponentModel<T extends ComponentWithIds>(
  comp: T,
  tools: PuppeteerTools
): ComponentModel<T> {
  const obj = {} as any;

  for (let key of Object.keys(comp.ids)) {
    obj[key] = new ComponentPropertyModel(tools, comp.ids[key]);
  }

  return obj;
}

class ComponentPropertyModel extends AbstractModel {
  constructor(tools: PuppeteerTools, private propId: string) {
    super(tools);
  }

  type(value: string) {
    return this.tools.type(this.propId, value);
  }

  click() {
    return this.tools.click(this.propId);
  }

  waitFor() {
    return this.tools.waitFor(this.propId);
  }

  valueOf() {
    return this.tools.valueOf(this.propId);
  }

  innerText() {
    return this.tools.innerText(this.propId);
  }

  attribute(attributeName: string) {
    return this.tools.attribute(this.propId, attributeName);
  }

  selectAllText() {
    return this.tools.selectAllText(this.propId);
  }

  async clickOpensTab(fn: (page: Page) => Promise<any> | any) {
    const [popup] = await Promise.all([
      new Promise<Page>(resolve => this.tools.page.once("popup", resolve)),
      await this.click(),
    ]);

    await fn(popup);
    await popup.close();
  }
}
