const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrgin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
  },
});
