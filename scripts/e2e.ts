import { runCLI } from "jest";
import path from "path";

export async function runE2ETests() {
  await runCLI({ config: path.join(process.cwd(), "jest.e2e.config.js") } as any, [process.cwd()]);
}
