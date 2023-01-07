
module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: './src/main.js',
      title: 'myfrees_store'
    },
  },
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `@import "@/assets/layout.scss";`
        additionalData: `@import "@/assets/custom/config.scss";`
      }
    }
  }
}
