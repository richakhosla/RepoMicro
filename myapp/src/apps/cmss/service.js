"use strict";
const { default: Logger } = require('cf-nodejs-logging-support/build/main/lib/logger/logger');

const SapCfAxios = require('sap-cf-axios').default;
//for test, use npm axios and for actual run, use gateway axios
const axios = process.env.NODE_ENV === 'test' ? require("axios") : SapCfAxios('CMServiceDestination');

const callPostApi = async (url, payload, res) => {
 console.log("process.env.NODE_ENV", process.env.NODE_ENV);
 try {
    const dataResp = await axios({
        method: "POST",
        url: url,
        data: payload,
        headers: {"content-type": "application/json"}
    });
    res.status(200).send(dataResp.data);
} catch (error) {
    res.status(500).send({ errorMessage: error });
}
}


module.exports = {
    callPostApi
}
