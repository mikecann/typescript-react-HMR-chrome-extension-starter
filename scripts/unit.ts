import { runCLI } from "jest";
import path from "path";

export async function runUnitTests() {
  await runCLI({ config: path.join(process.cwd(), "jest.unit.config.js") } as any, [process.cwd()]);
}
