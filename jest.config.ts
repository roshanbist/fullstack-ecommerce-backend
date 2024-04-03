import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.(test|spec).(ts|js)"],
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
};

export default config;