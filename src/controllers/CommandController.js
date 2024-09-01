const AWS = require("aws-sdk");
const fs = require("fs");
const https = require("https");

const caCert = fs.readFileSync("src/assets/certificates/AmazonRootCA1.pem");
const agent = new https.Agent({
  ca: caCert,
  rejectUnauthorized: false,
});

const iotdata = new AWS.IotData({
  endpoint: process.env.ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  httpOptions: {
    agent: agent,
  },
});
async function sendCommandToESP32(uid, command) {
  const topic = `esp32/${uid}/sub`;
  const payload = JSON.stringify({ command });

  const params = {
    topic: topic,
    payload: payload,
    qos: 1,
  };

  return new Promise((resolve, reject) => {
    iotdata.publish(params, (err, data) => {
      if (err) {
        console.error("Failed to publish to MQTT topic:", err);
        return reject(err);
      }
      console.log("Successfully published to MQTT topic:", topic);
      resolve(data);
    });
  });
}

const sendCommand = async (req, res) => {
  const { command, uid } = req.body;

  if (!command || !uid) {
    return res.status(400).send({ message: "Command and UID are required" });
  }

  try {
    await sendCommandToESP32(uid, command);
    res.status(200).send({ message: "Command sent successfully" });
  } catch (error) {
    console.error("Error sending command:", error);
    res.status(500).send({ message: "Failed to send command" });
  }
};

module.exports = {
  sendCommand,
};
