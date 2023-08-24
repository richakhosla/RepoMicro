const express = require("express");
//const appRoute = require("./routes");
const appRoute = require('./apps/cmss/controller');
const app = express();
app.use(express.json());


const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec');
const passport = require('passport');
const cfenv = require("cfenv");

//testing
if(process.env.NODE_ENV !== 'test')
{
let oAppEnv = cfenv.getAppEnv();
let boundServices = oAppEnv.services;  
let uaaServiceName = boundServices["xsuaa"][0].name;
xsenv.loadEnv();
const uaaService = xsenv.getServices({uaa: uaaServiceName });
passport.use('JWT', new xssec.JWTStrategy(uaaService.uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));
}

app.use("/", appRoute);

module.exports = app;