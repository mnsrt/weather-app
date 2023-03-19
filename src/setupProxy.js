// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
        target: 'https://www.ilmateenistus.ee',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/ilma_andmed/xml/observations.php',
        },
        onProxyRes: function(proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
    }));
};
