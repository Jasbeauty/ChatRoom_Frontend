module.exports = {
  // 修改的配置
  devServer: {
    proxy: {
      '/access_token': {
        target: 'https://github.com/login/oauth/access_token',//设置你调用的接口域名
        // changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/access_token': ''
        }
      },
      '/user': {
        target: 'https://api.github.com/user',//设置你调用的接口域名
        // changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/user': ''
        }
      }


    }
  }
}