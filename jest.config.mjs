import nextJest from "next/jest.js";

// NB Jest automatically use the mock from the `__mocks__` folder if it exists

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!src/**/index.(ts|tsx)",
    "!src/**/*.stories.(ts|tsx)",
  ],

  // The directory where Jest should output its coverage files
  // coverageDirectory: undefined,

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: ["/node_modules/"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "text",
    "html",
    // "lcov",
    // "clover"
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/", "/__e2e__/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
