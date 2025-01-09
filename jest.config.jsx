export default {
  testEnvironment: 'jsdom', // Simulates a DOM environment
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Setup file for Jest
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'], // Ignore these directories
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};