var static = require("node-static");
const https = require("https");
const http = require("http");
const fs = require("fs");

const file = new static.Server();

function servingFunction(req, res) {
    req.addListener("end", function () {
        try {
            file.serve(req, res);
        } catch (err) {
            res.writeHead(400).write("<h1>File not found</h1>").end();
        }
    }).resume();
}

if (!process.env.HTTPS_DISABLED) {
    const options = {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
    };

    https
        .createServer(options, servingFunction)
        .listen(process.env.PORT || 3000);
} else {
    http.createServer(servingFunction).listen(process.env.PORT || 3000);
}
