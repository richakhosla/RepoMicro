const express = require("express");
const app = express();
const { callPostApi } = require("./service");
const logger = require('cf-nodejs-logging-support');


app.post('/3pss_request', async (req, res, next) => {
    try {
        
        let blocks = await callPostApi(req.url, req.data)
        //console.log("controller Success", dataRes)
        res.status(200).send(blocks);
    } catch (error) {
        logger.error(error);
        res.status(500).send({ status: 500, errorMessage: error });
    }
});

app.post('/cmss_request', async (req, res, next) => {
    try {
        let blocks = await callPostApi(req.url, req.body);
        res.status(200).send(blocks);
    } catch (error) {
        logger.error(error);
        res.status(500).send({ status: 500, errorMessage: error });
    }
});

module.exports = app;
