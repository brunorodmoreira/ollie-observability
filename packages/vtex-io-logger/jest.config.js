/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  silent: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
};