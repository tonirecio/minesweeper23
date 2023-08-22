module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(t|m?j)sx?$': '@swc/jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarn/', '<rootDir>/src/style/'],
    moduleFileExtensions: ['js', 'mjs', 'jsx'],
    moduleNameMapper: {
        uuid: require.resolve('uuid'),
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/__tests__/__mocks__/fileMock.js',
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        'src/__tests__/',
        'node_modules/',
        '.yarn/'
    ]
}
