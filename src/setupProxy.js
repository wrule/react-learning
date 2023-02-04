const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({
    target: 'http://10.10.31.20:8081',
    changeOrigin: true,
  }));
};
