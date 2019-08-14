module.exports = function babelConfig(api) {
  api.cache(() => process.env.NODE_ENV);
  const babelEnv = api.env();

  const alias = require('./alias.js');
  const isProd = babelEnv === 'production';
  const isDev = !isProd;

  const config = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['import', { libraryName: 'antd', style: 'css' }, 'antd'],
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias,
        },
      ],
    ],
  };

  if (isDev) {
    config.plugins.push('react-hot-loader/babel');
  }

  return config;
};
