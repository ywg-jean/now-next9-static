const path = require('path');

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const withTM = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  env: {
    // Will be available on both server and client
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    MATOMO_URL: process.env.MATOMO_URL,
    MATOMO_SITE_ID: process.env.MATOMO_SITE_ID
  },
  webpack: function(config, options) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    config.externals = config.externals || [];
    return config;
  },

  target: 'serverless',
  transpileModules: ['@yupwego'],
  babelConfigFile: path.resolve('./babel.config.js')
};

module.exports = withCustomBabelConfigFile(
  withBundleAnalyzer(withCSS(withTypescript(withTM(nextConfig))))
);
