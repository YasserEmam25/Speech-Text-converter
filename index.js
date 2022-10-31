const converter = require("./services/converter");
const express = require("express");

const app = express();
const port = 3000;

const accents = {
  australia: "en-AU",
  canda: "en-CA",
  ghana: "en-GH",
  "hong kong": "en-HK",
  india: "en-IN",
  ireland: "en-IR",
  kenya: "en-KE",
  "new zealand": "en-NZ",
  nigeria: "en-NG",
  pakistan: "en-PK",
  philip: "en-PH",
  singapore: "en-SG",
  "south africa": "en-ZA",
  tanzania: "en-TZ",
  uk: "en-GB",
  usa: "en-US",
};

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Use post man");
});

app.post("/", (req, res) => {
  const accent = accents[req.body.accent];
  const audio = req.body.audio.toString("base64");
  converter(audio, accent).then((result) => {
    result = result
      ? "Speech converted successfully"
      : "Failed to convert the audioz";

    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
