module.exports = {
    // preset: 'ts-jest',
    // testEnvironment: 'node',
    verbose: true,
    setupFiles: ["./jest-integration-setup.js"],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    testRegex: 'src/.*\\.integration_test\\.ts(x?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
    },
    
    // collectCoverage: false,
    coverageDirectory: 'coverage',
    // collectCoverageFrom: [
    //     'src/.*\\.spec\\.ts(x?)$'
    // ],
    coveragePathIgnorePatterns: [
        '^.+\\.d\\.ts$',
        'src/full\\.ts$'
    ]
};
