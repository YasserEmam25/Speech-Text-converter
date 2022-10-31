const converter = require("./services/converter");
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const result = converter()
    ? "Speech converted successfully"
    : "Failed to convert the audio";

  res.send(result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
