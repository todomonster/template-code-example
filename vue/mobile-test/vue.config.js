const MODE = process.env.VUE_APP_MODE
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
console.log('\x1b[100m', `MODE=${MODE} start...`);

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
