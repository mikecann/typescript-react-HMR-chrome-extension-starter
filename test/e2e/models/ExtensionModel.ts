import { AbstractModel } from "../utils/AbstractModel";
import { config } from "../../../scripts/config";

const extensionRootUrl = `chrome-extension://${config.EXTENSION_ID}/`;

export class ExtensionModel extends AbstractModel {
  async openPage(page: string, inANewTab = false) {
    if (inANewTab) await this.tools.newPage(`${extensionRootUrl}${page}.html`);
    else await this.tools.page.goto(`${extensionRootUrl}${page}.html`);
  }
}
