module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    },
    electronBuilder: {
      nodeIntegration: true
    }
  },

  devServer: {
    proxy: 'https://localhost:8000'
  }

}
