const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.assetExts = [...config.resolver.assetExts, 'h5', 'bin'];
module.exports = config;
