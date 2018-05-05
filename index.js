const express = require('express');
const _app = require('./src/app')
const app = express()

var bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Content-Type",'application/json');
    next();
});

app.use('*', _app(express()))
app.listen(3000);