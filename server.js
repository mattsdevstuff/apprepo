"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = require("path");
var http_proxy_middleware_1 = require("http-proxy-middleware");
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
// Configure the proxy for API requests
var apiProxy = (0, http_proxy_middleware_1.createProxyMiddleware)('/api', {
    target: 'http://backend-service.app-project-468120.svc.cluster.local', // Replace with your backend service's internal URL
    changeOrigin: true, // Important for virtual hosted sites
    pathRewrite: {
        '^/api': '', // Rewrite path to remove /api prefix
    },
    onProxyReq: function (proxyReq, req, res) {
        console.log("Proxying request: ".concat(req.method, " ").concat(req.url, " -> ").concat(proxyReq.getHeader('host')).concat(proxyReq.path));
    },
});
app.use(apiProxy);
// Serve static files from the dist directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
// Catch-all for SPA routing (if needed, this serves index.html for any non-API/static path)
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
// Start the server
app.listen(port, function () {
    console.log("Frontend proxy server listening on port ".concat(port));
});
