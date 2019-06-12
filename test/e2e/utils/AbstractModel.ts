import { PuppeteerTools } from "./PuppeteerTools";

export abstract class AbstractModel {
  constructor(protected tools: PuppeteerTools) {}
}
