"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 8080;
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));
// Serve index.html for all other routes to enable client-side routing
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(port, function () {
});
