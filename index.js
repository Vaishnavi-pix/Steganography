// index.js
const functions = require("@google-cloud/functions-framework");
const app = require("./app.js");

// Pass your entire Express routing map right into the framework
functions.http("stegApp", app);