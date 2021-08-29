/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.ts"],

  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  // coverageReporters: ["json", "lcov", "text", "clover"],
  // moduleFileExtensions: ["ts", "js", "json", "node"],
  // collectCoverage: true,
  // clearMocks: true,
  // coverageDirectory: "coverage",
};
