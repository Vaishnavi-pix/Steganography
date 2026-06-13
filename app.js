// app.js
const express = require("express");
const stegUtil = require("./modules/stegUtil.js");

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json());

// Routes
app.post("/stegText", async (req, res) => {
  const inputJSON = req.body;
  const inputText = inputJSON.inputText;
  const coverType = inputJSON.coverType || "email"; // Default to "email" if not provided

  if (!inputText) {
    return res.status(400).send("Missing 'inputText' in request body.");
  }

  try {
    let stegText = await stegUtil.stegString(inputText, coverType);
    return res.send(stegText);
  } 
  catch (error) {
    return res.status(500).send("Error encoding text.");
  }
});

app.post("/deStegText", async (req, res) => {
  const inputJSON = req.body;
  const inputText = inputJSON.inputText;

  if (!inputText) {
    return res.status(400).send("Missing 'inputText' in request body.");
  }

  try {
    let clearText = stegUtil.deStegText(inputText);
    return res.send(clearText);
  } catch (error) {
    return res.status(500).send("Error decoding text.");
  }
});

// Export the express app instance for the Functions Framework
module.exports = app;