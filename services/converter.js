const speech = require("@google-cloud/speech");
const fs = require("fs");
require("dotenv").config();

const converter = async (audioInput, accent) => {
  try {
    const client = new speech.SpeechClient();

    const audio = {
      content: audioInput,
    };

    // let config;
    const config = {
      encoding: "AMR",
      sampleRateHertz: 8000,
      languageCode: accent,
    };

    const request = { audio, config };

    const [response] = await client.recognize(request);
    let transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("/n");

    // google apis didn't transform the speech to text
    if (!transcription) {
      result = `Google Error: ${transcription}`;
      await fs.writeFile("/out/output.txt", transcription);
    } else {
      console.log(`Error error in google apis`);
    }

    return result;
  } catch (err) {
    console.log(`Error in converter: ${err.message}`);
  }
};

module.exports = converter;
