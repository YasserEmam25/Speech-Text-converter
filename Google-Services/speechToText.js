const speech = require("@google-cloud/speech");
const fs = require("fs");
require("dotenv").config();

async function speechToText(req, res) {
  try {
    const client = new speech.SpeechClient();
    // const filename='../resources/audioFiles/WhatsApp Ptt 2022-08-30 at 4.42.00 PM (online-audio-converter.com).mp3';
    // const file = fs.readFileSync(filename);
    // const audioBytes=file.toString('base64');
    const audioBytes = req.body.audioEncoded.toString("base64");

    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: "MP3",
      sampleRateHertz: 16000,
      languageCode: "ar-EG",
    };

    const request = {
      audio: audio,
      config: config,
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("/n");
    console.log(`Transcript: ${transcription}`);
    res.send(`Transcript: ${transcription}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = speechToText;
