"use strict";

const SapCfAxios = require('sap-cf-axios').default;
//for test, use npm axios and for actual run, use gateway axios
const axios = process.env.NODE_ENV === 'test' ? require("axios") : SapCfAxios('DSM');

const callPostApi = async (url, payload) => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    try {
        const dataResp = await axios({
            method: "POST",
            url: url,
            data: payload,
            headers: {"content-type": "application/json"}
        });
        return dataResp.data;
    } catch (error) {
        return error.response;
    }
}

module.exports = {
    callPostApi
}
