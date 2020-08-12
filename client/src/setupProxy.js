const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google", "/facilities", "/city"],
        createProxyMiddleware({
            target: "http://localhost:8090",
        })
    );
};