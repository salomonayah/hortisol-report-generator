const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: process.env.REACT_APP_BASE_URL,
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxy));
};
