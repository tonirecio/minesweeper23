module.exports = {
    testEnvironment: 'jsdom',
    transform: {
    '^.+\\.(t|m?j)sx?$': '@swc/jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/'],
    moduleFileExtensions: ['js', 'mjs', 'jsx'],
    moduleNameMapper: {
    uuid: require.resolve('uuid'),
    moduleNameMapper: {
        uuid: require.resolve('uuid'),
       '\\.(css|less|png|jpg|gif|jpeg|webp)$': 'identity-obj-proxy' // Afegim aquesta línia
      },
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
    'src/__tests__/',
    'node_modules/',
    '.yarn/'
    ]
    }
    