import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = process.env.PORT || 8080;

// Configure the proxy for API requests
const apiProxy = createProxyMiddleware('/api', {
  target: 'http://backend-service.app-project-468120.svc.cluster.local', // Replace with your backend service's internal URL
  changeOrigin: true, // Important for virtual hosted sites
  pathRewrite: {
    '^/api': '', // Rewrite path to remove /api prefix
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request: ${req.method} ${req.url} -> ${proxyReq.getHeader('host')}${proxyReq.path}`);
  },
});

app.use(apiProxy);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all for SPA routing (if needed, this serves index.html for any non-API/static path)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Frontend proxy server listening on port ${port}`);
});