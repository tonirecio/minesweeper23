/* eslint-disable */
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(t|m?j)sx?$': '@swc/jest'
        
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/'],
    moduleFileExtensions: ['js', 'mjs', 'jsx'],
    moduleNameMapper: {
        uuid: require.resolve('uuid'),
        '\\.(css|less)$': 'identity-obj-proxy' // Afegim aquesta línia
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
    'src/__tests__/',
    'node_modules/',
    '.yarn/'
    ]
    }
    