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
            assets: ['./assets'],
            src: ['./src'],
            components: ['./src/components'],
            screens: ['./src/screens'],
            sdk: ['./src/sdk'],
            navigation: ['./src/navigation'],
            views: ['./src/views'],
            services: ['./src/services'],
            theme: ['./src/theme/'],
            utils: ['./src/utils'],
            routes: ['./src/routes'],
            hooks: ['./src/hooks'],
            tests: ['./tests'],
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
