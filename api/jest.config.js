export default {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/migrations/'
    ],
    testMatch: ['**/__tests__/**/*.test.js']
  };