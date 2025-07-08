const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://flipdot.onrender.com",
  "https://love-to-read.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://52.90.19.163:8080",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyRes(proxyRes, req) {
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        proxyRes.headers["Access-Control-Allow-Origin"] = origin;
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      }
    }
  })
);

app.use(
  "/love-to-read",
  createProxyMiddleware({
    target: "http://52.90.19.163:8081",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
    onProxyRes(proxyRes, req) {
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
        proxyRes.headers["Access-Control-Allow-Origin"] = origin;
        proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
      }
    }
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});