import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'jest-expo',
  testTimeout: 20 * 1000,
  moduleNameMapper: {
    // '^[@./a-zA-Z0-9$_-]+\\.(png|jpg|gif)$':
    //   '<rootDir>tests/mock/assets-mock/adaptive-img.tsx',
    '^assets(.*)$': '<rootDir>/assets$1',
    '^src(.*)$': '<rootDir>/src$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^business(.*)$': '<rootDir>/src/business$1',
    '^navigation(.*)$': '<rootDir>/src/navigation$1',
    '^sdk(.*)$': '<rootDir>/src/sdk$1',
    // '^services(.*)$': '<rootDir>/src/services$1',
    '^theme(.*)$': '<rootDir>/src/theme$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^screens(.*)$': '<rootDir>/src/screens$1',
    // '^routes(.*)$': '<rootDir>/src/routes$1',
    // '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^tests(.*)$': '<rootDir>/tests$1',
  },
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react',
        },
      },
    ],
  },
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**', '**/app/**'],
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
};
export default config;
