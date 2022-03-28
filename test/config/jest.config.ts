import { cpus } from 'os'

const cpuCount = cpus().length
const maxConcurrency = cpuCount > 4 ? cpuCount - 2 : cpuCount

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended/all'],
  verbose: true,
  logHeapUsage: true,
  cache: false,
  bail: true,
  maxConcurrency,
  maxWorkers: maxConcurrency,
  testTimeout: 60000,
}
