const MODE = process.env.VUE_APP_MODE
console.log(`MODE=${MODE} start building...`);

let outputDir = "dist";
if (MODE === "green") {
  outputDir = "dist_user";
}

module.exports = {
  publicPath: './',
  outputDir,
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
