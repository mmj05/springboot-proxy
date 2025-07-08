const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

const target = "http://52.90.19.163:8080/api";

app.use(cors({
  origin: "https://flipdot.onrender.com",
  credentials: true
}));

app.use(
  "/api",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyRes(proxyRes, req, res) {
      // Set CORS headers manually on the proxied response
      proxyRes.headers["Access-Control-Allow-Origin"] = "https://flipdot.onrender.com";
      proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
    }
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});