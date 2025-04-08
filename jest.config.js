module.exports = {
  testEnvironment: 'node',
  verbose: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['./tests/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/migrations/**',
    '!src/seeders/**',
    '!src/config/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
