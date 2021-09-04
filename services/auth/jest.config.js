/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  coverageReporters: ["json", "lcov", "text", "clover"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  // collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
};
