module.exports = {
  configureWebpack: {
    externals: {
      vue: "vue",
      "single-spa": "single-spa",
      "single-spa-vue": "single-spa-vue"
    },
    devServer: {
      compress: true,
      hot: true
    }
  }
};
