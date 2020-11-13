module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    }
  },

  devServer: {
    proxy: 'https://localhost:8000'
  }

}
