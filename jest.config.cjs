module.exports = {
    // preset: 'ts-jest',
    // testEnvironment: 'node',
    verbose: true,
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    testRegex: 'src/.*\\.spec\\.ts(x?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
    },
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '^.+\\.d\\.ts$',
        'src/full\\.ts$'
    ]
};
