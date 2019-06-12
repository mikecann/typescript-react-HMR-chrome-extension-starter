import { PuppeteerTools } from "./PuppeteerTools";
import { ConsoleListener } from "./ConsoleListener";
import { config } from "../../../scripts/config";
import { wait } from "./wait";

const log = console.log;

export class TestFramework {
  constructor(private tools: PuppeteerTools, private consoleListener = new ConsoleListener(tools)) {
    beforeAll(async () => {
      await tools.loadBrowser();
      consoleListener.listen();
    });

    afterAll(async () => {
      await tools.closeBrowser();
    });

    beforeEach(async () => {
      log("");
      log("-----------------------------------------------------");
      log("");
      await this.tools.nextTest();
      await this.tools.clearCookies();
    });

    afterEach(async () => {
      this.consoleListener.reset();
      await this.tools.clearCookies();
    });
  }

  beforeAll(fn: () => Promise<any> | any) {
    beforeAll(fn);
  }

  afterAll(fn: () => Promise<any> | any) {
    afterAll(fn);
  }

  beforeEach(fn: () => Promise<any> | any) {
    beforeEach(fn);
  }

  afterEach(fn: () => Promise<any> | any) {
    afterEach(fn);
  }

  describe(name: string, fn: () => Promise<any> | any) {
    describe(name, () => {
      return fn();
    });
  }

  it(name: string, fn: () => Promise<any> | any, jestFn = it) {
    jestFn(name, async () => {
      try {
        log("");
        log(`it '${name}'`);
        log("");
        const resp = await fn();
        log("");
        log(`it PASSED`);
        log("");
      } catch (e) {
        log("");
        log(`it FAILED`);
        log("");
        await wait(100);
        log(`--------- Browser Console ----------`);
        this.consoleListener.logBuffer();
        log(`------------------------------------`);
        log("");
        throw e;
      }
    });
  }

  only(name: string, fn: () => Promise<any> | any) {
    this.it(name, fn, config.NO_ONLY_TESTS == "true" ? it : fit);
  }
}
