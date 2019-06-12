import { runCLI } from "jest";
import path from "path";

export async function runE2ETests() {
  await runCLI({ config: path.join(process.cwd(), "jest.config.e2e.js") } as any, [process.cwd()]);
}
