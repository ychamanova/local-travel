const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google", "/facilities", "/city", "/save", "/text"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};