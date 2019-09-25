const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';
const APP_ENV = process.env.APP_ENV || 'development';
const port = 8052;

const resolvePath = _path => {
  return path.join(__dirname, _path);
};
const srcPath = resolvePath('../src');

function getStyleLoader() {
  return [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: [require('autoprefixer')()],
      },
    },
  ];
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: isDev
    ? ['react-hot-loader/patch', './src/index.tsx']
    : ['./src/index.tsx'],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },

  // Enable sourcemaps for debugging webpack output.
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    // alias: isDev
    //   ? {
    //       'react-dom': '@hot-loader/react-dom',
    //     }
    //   : null,
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [resolvePath('./src'), resolvePath('../form/src')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.less$/,
        use: [
          ...getStyleLoader(),
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.html',
    }),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(APP_ENV || 'development'),
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port,
    inline: true,
    hot: true,
    compress: true,
    publicPath: '/',
    noInfo: true,
    contentBase: srcPath,
    disableHostCheck: true,
    historyApiFallback: true,
    clientLogLevel: 'none',
    overlay: true,
    stats: 'minimal',
    watchOptions: {
      ignored: [resolvePath('../dist'), resolvePath('../node_modules')],
    },
  },
};
