module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './',
          alias: {
            src: ['./src'],
            assets: ['./assets'],
            components: ['./src/components'],
            screens: ['./src/screens'],
            sdk: ['./src/sdk'],
            navigation: ['./src/navigation'],
            services: ['./src/services'],
            theme: ['./src/theme/'],
            utils: ['./src/utils/'],
            hooks: ['./src/hooks'],
            tests: ['./tests'],
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
