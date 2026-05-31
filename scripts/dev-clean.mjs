import { rmSync } from "fs";
import { execSync, spawn } from "child_process";

function killPort(port) {
  try {
    if (process.platform === "win32") {
      const output = execSync(`netstat -ano | findstr :${port}`, {
        encoding: "utf8",
      });
      const pids = new Set();
      for (const line of output.split("\n")) {
        if (!line.includes("LISTENING")) continue;
        const pid = line.trim().split(/\s+/).at(-1);
        if (pid && pid !== "0") pids.add(pid);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        } catch {
          /* already stopped */
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
    }
  } catch {
    /* port not in use */
  }
}

rmSync(".next", { recursive: true, force: true });
killPort(3000);
killPort(3001);

spawn("npx", ["next", "dev"], { stdio: "inherit", shell: true });
