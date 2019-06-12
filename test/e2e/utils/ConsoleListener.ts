import { PuppeteerTools } from "./PuppeteerTools";

export class ConsoleListener {
  private buffer: any[] = [];

  constructor(private tools: PuppeteerTools) {}

  listen() {
    this.tools.page.on("console", msg => {
      let str = msg.text();
      if (str)
        str = str.replace("[%c", "").replace("font-weight: bold; text-decoration: underline ", "");
      this.buffer.push(str);
    });

    this.tools.page.on("error", error => {
      this.buffer.push("error ==> " + error);
    });

    this.tools.page.on("pageerror", error => {
      this.buffer.push("pageerror ==> " + error);
    });

    this.tools.page.on("requestfailed", error => {
      this.buffer.push("requestfailed ==> " + error);
    });
  }

  reset() {
    this.buffer = [];
  }

  logBuffer() {
    for (let line of this.buffer) console.log(line);
  }
}
