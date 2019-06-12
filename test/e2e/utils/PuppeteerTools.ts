import puppeteer, { SetCookie } from "puppeteer";
import { config } from "../../../scripts/config";
import { createComponentModel } from "./ComponentModel";

let log = console.log;
const originalLog = log;

export let browser: puppeteer.Browser;
export let page: puppeteer.Page;

export class PuppeteerTools {
  private _browser: puppeteer.Browser;
  private _page: puppeteer.Page;

  get page() {
    return this._page;
  }

  get browser() {
    return this._browser;
  }

  async reload(page = this._page) {
    log(`reloading browser`);
    return page.reload();
  }

  url(page = this._page) {
    return page.url();
  }

  async loadBrowser() {
    log("");

    const absDistPath = `${__dirname}/../../../dist`;

    log("launching browser", puppeteer);
    this._browser = await puppeteer.launch({
      headless: false,
      args: [
        "--user-agent=PuppeteerAgent",
        `--disable-extensions-except=${absDistPath}`,
        `--load-extension=${absDistPath}`,
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
      defaultViewport: {
        width: Number.parseInt(config.VIEWPORT_WIDTH),
        height: Number.parseInt(config.VIEWPORT_HEIGHT),
      },
    });
    this._page = (await this._browser.pages())[0];

    return { browser: this._browser, page: this._page };
  }

  async nextTest() {
    const testStartTime = Date.now();
    log = (...args: any[]) => originalLog(`[${Date.now() - testStartTime}ms]`, ...args);
  }

  async clearCookies(page = this._page) {
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.detach();
  }

  async closeBrowser(browser = this._browser) {
    log(`closing browser`);
    await browser.close();
  }

  async newPage(path: string, browser = this._browser) {
    log(`onpening new page to '${path}'`);
    const page = await browser.newPage();
    await page.goto(path);
    return page;
  }

  async goto(url: string, page = this._page) {
    log(`going to '${url}' from ${page.url()}`);
    if (page.url() == url) {
      log("its the same url so forcing a reload instead..");
      await page.reload();
    } else await page.goto(url);
  }

  async waitFor(name: string, page = this._page) {
    log(`waiting for '${name}'`);
    return await page.waitFor(idSelector(name), { timeout: 5000 });
  }

  async exists(name: string, page = this._page) {
    const el = await page.$(idSelector(name));
    return el != undefined;
  }

  async valueOf(name: string, page = this._page) {
    await this.waitFor(name);
    log(`getting the value of '${name}'`);
    return await page.$eval(idSelector(name), (el: any) => el.value as (string | undefined));
  }

  async innerText(name: string, page = this._page) {
    await this.waitFor(name);
    log(`getting the value of '${name}'`);
    return await page.$eval(idSelector(name), (el: any) => el.innerText);
  }

  async waitForAttribute(
    elementName: string,
    attributeName: string,
    attributeValue: string,
    page = this._page
  ) {
    log(
      `waiting for element '${elementName}' with attribute '${attributeName}' to have value ${attributeValue}`
    );
    await page.waitForSelector(idSelector(elementName) + `[${attributeName}=${attributeValue}]`);
  }

  async waitForSelector(selector: string, page = this._page) {
    log(`waiting for selector '${selector}'`);
    await page.waitFor(selector);
  }

  async waitForTime(ms: number, page = this._page) {
    log(`waiting for ${ms}ms`);
    await page.waitFor(ms);
  }

  async type(name: string, value: string, page = this._page) {
    await this.waitFor(name, page);
    log(`typing '${value}' into '${name}'`);
    await page.type(idSelector(name), value);
  }

  async selectAllText(name: string, page = this._page) {
    await this.waitFor(name, page);
    log(`selecting all text in '${name}'`);
    const input = await page.$(idSelector(name));
    if (!input) throw new Error("couldnt find input for " + name);
    await input.click({ clickCount: 3 });
  }

  async click(name: string, page = this._page) {
    await this.waitFor(name, page);
    log(`clicking '${name}'`);
    await page.click(idSelector(name));
  }

  async clickSelector(selector: string, page = this._page) {
    await this.waitForSelector(selector, page);
    log(`clicking '${selector}'`);
    await page.click(selector);
  }

  async attribute(elementName: string, attributeName: string, page = this._page) {
    await this.waitFor(elementName);
    return await page.$eval(
      idSelector(elementName),
      (el, an) => el.getAttribute(an),
      attributeName
    );
  }

  model<T extends { ids: Record<string, string> }>(component: T) {
    return createComponentModel(component, this);
  }
}

export const selector = (propName: string) => (value: string) =>
  `*[data-test-${propName}=${value}]`;

export const idSelector = selector("id");
