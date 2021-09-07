const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const devServer = (develop) => {
  return develop ? {
    devServer:{
      port: 3000,
      open: true,
    }
  } : {};
}

const eslint = (develop) => {
  return develop ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js', 'tsx'] }) ];
}

module.exports = ({develop}) => ({
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx??$/,
        loader: "ts-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtract.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new MiniCssExtract({ filename: "[name].[contenthash].css" }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyPlugin({
      patterns: [{ from: "./public" }],
    }),
    new CleanWebpackPlugin(),
    ...eslint(develop)
  ],
  ...devServer(develop)
})