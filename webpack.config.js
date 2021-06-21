const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const zlib = require('zlib');


module.exports = {
  entry: {
    app: './assets/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './giftdist'),
    publicPath: '/giftdist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
         { loader: 'css-loader',
           options: { sourceMap: true }
         },
         { loader: 'postcss-loader',
           options: { sourceMap: true,
                      config: { path: './postcss.config.js'}
                    }
         } ]
       },
       {
      test: /\.scss$/,
         use: [
           'style-loader',
           MiniCssExtractPlugin.loader,
            { loader: 'css-loader',
              options: { sourceMap: true }
            },
            { loader: 'postcss-loader',
              options: { sourceMap: true,
              config: { path: './postcss.config.js'}
                      }
            },
             {
              loader: 'sass-loader',
              options: { sourceMap: true }
            } ]
           },
          {
            test: /\.(jpg|JPG|jpeg|png|ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [{
                loader: 'file-loader'
            }]
          }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[name].css',
    //  chunkFilename: '[id].css',
    }),
  /*  new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
      //  threshold: 10240,
        minRatio: 0,
    }),
    
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
  }), */
  ],
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  devServer: {
    overlay: true
  },
    resolve: {
      extensions: ['.js', '.ts'],
    //  alias: { moment$: path.resolve(__dirname, "node_modules/moment/moment.js") }
  },
  
}
