// Import necessary plugins and modules
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import * as webpack from 'webpack';
import { Configuration as WebpackConfiguration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

// Determine if the environment is development
const isDevelopment = process.env.NODE_ENV !== 'production';

// Initialize plugins array
const plugins: webpack.WebpackPluginInstance[] = [
  // HTML Webpack Plugin to generate HTML file
  new HTMLWebpackPlugin({
    template: './public/index.html',
  }),
];

// Add plugins based on the environment
if (isDevelopment) {
  // Use React Refresh plugin for hot reloading in development
  plugins.push(new ReactRefreshWebpackPlugin());
} else {
  // Use Mini CSS Extract Plugin for production
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css', // Output CSS file name
      chunkFilename: '[id].css', // CSS file name for chunks
    })
  );
  // Add Bundle Analyzer Plugin for production analysis
  plugins.push(new BundleAnalyzerPlugin());
}

// Webpack configuration object
const config: Configuration = {
  // Set mode to development or production
  mode: isDevelopment ? 'development' : 'production',
  // Development server configuration
  devServer: {
    historyApiFallback: true,
    hot: true, // Enable hot module replacement
    port: 3000, // Server port
    static: {
      directory: path.resolve(__dirname, 'public'), // Directory to serve static files from
    },
  },

  // Entry point for the application
  entry: ['./src/index.tsx', './src/lib/styles/main.scss'],

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: '[name].[contenthash].js', // Use content hash for unique filenames
    clean: true, // Clean output directory before each build
  },

  // Plugins array
  plugins,

  // Resolve configuration
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'], // Module resolution paths
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'], // Automatically resolve these extensions
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for main directory
      '@pages': path.resolve(__dirname, './src/pages'), // Alias for pages directory
      '@components': path.resolve(__dirname, './src/components'), // Alias for components directory
      '@lib': path.resolve(__dirname, './src/lib'), // Alias for lib directory
      '@public': path.resolve(__dirname, './public'), // Alias for public dirctory
    },
  },

  // Module rules
  module: {
    rules: [
      {
        // Rule for HTML files
        test: /\.html$/,
        use: ['html-loader'], // Loader for HTML files
      },
      {
        // Rule for JavaScript and TypeScript files
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/, // Exclude node_modules directory
        use: [
          {
            loader: 'babel-loader', // Use Babel for transpiling
            options: {
              plugins: [
                // Add React Refresh plugin in development
                isDevelopment && 'react-refresh/babel',
              ].filter(Boolean), // Filter out false values
            },
          },
        ],
      },
      {
        // Rule for Sass and CSS files
        test: /\.(sa|sc|c)ss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDevelopment
                  ? '[name]__[local]--[hash:base64:5]'
                  : '[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]', // Output format for images
              outputPath: 'images/', // Output directory for images
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65, // Adjust quality as needed
              },
              // Optipng Settings
              optipng: {
                enabled: true,
              },
              // Pngquant Settings
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              // WebP Settings
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.inline.svg$/,
        use: 'svgr/webpack',
      },
    ],
  },

  // Optimization configuration for code splitting and minification
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // Minimum size for a chunk to be created
      maxSize: 70000, // Maximum size for a chunk
      minChunks: 1, // Minimum number of times a chunk must be reused
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // Minify the code using Terser with custom settings
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // Remove console statements from the code
            drop_console: true,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default config;
