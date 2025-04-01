const { getDefaultConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Wrap the default config with Reanimated support
module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
