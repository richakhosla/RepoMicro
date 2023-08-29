const express = require("express");
const app = express();
const { callPostApi } = require("./service");
const { default: Logger } = require('cf-nodejs-logging-support/build/main/lib/logger/logger');

app.post('/3pss_request', async (req, res) => {
    try {
     await callPostApi(req.url,req.data, res);
        //console.log("controller Success", dataRes)
    } catch (error) {
        Logger.error("errorMessage", error)
        res.status(500).send({ errorMessage: error });
    }
});

app.post('/cmss_request', async (req, res) => {
    try {
        await callPostApi(req.url, req.data, res);
    } catch (error) {
        res.status(500).send({ ErrorMessage: error });
    }
});

module.exports = app;
