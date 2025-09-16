module.exports = {
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.client = {
        overlay: true, // 禁用覆盖层
      };
      return config;
    };
  },
};