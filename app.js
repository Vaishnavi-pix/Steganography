const express = require("express");
const stegUtil = require("./modules/stegUtil.js");


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/stegText", async (req, res) => {
  //console.log("Entering convertToHex");
  var inputJSON = req.body;
  var inputText = inputJSON.inputText;

  if (!inputText) {
    return res.status(400).send("Missing 'inputText' in request body.");
  }

  let stegText =
    await stegUtil.stegString(inputText);

  //console.log("app.js Got Steg Text: " + stegText);
  return res.send(stegText);
});

app.post("/deStegText", async (req, res) => {
  console.log("Entering convertToHex");
  var inputJSON = req.body;
  var inputText = inputJSON.inputText;

  if (!inputText) {
    return res.status(400).send("Missing 'inputText' in request body.");
  }

  //console.log("/deStegText Got: " + typeof inputText);

  let clearText =
    stegUtil.deStegText(inputText);

  //console.log(clearText);
  return res.send(clearText);
});