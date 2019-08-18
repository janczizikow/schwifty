module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['react-native/Libraries/react-native/'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation/.*|react-native-screens))',
  ],
  setupFiles: [
    '<rootDir>/jest.setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};
