const AWS = require("aws-sdk");
const fs = require("fs");
const https = require("https");
const UserProduct = require("../models/UserProduct");

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

const setPower = async (req, res) => {
  const { uid, command } = req.body;

  if (!uid || !command) {
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

const setControls = async (req, res) => {
  const mode = req.query.mode;
  const { uid, pin, controlId, value } = req.body;
  if (!uid || !pin || !controlId || !value) {
    res.status(400).send({
      message: "UID, pin, controlId and value are required",
    });
  }
  try {
    const command = `${pin}_${mode}_${value}`;
    await sendCommandToESP32(uid, command);
    const userProduct = await UserProduct.findOne({ uid: uid }).exec();
    if (!userProduct) {
      res.status(404).send({ message: "User product not found" });
    }
    let message = "";
    let controlUpdated = false;
    userProduct.controls.forEach((control) => {
      if (control[pin] && control[pin].controlId === controlId) {
        switch (mode) {
          case "threshhold":
            control[pin].threshHold = value;
            message = "Threshhold set successfully";
            controlUpdated = true;
            break;
          case "bypass":
            control[pin].bypass = value;
            message = "Control Bypassed Successfully";
            controlUpdated = true;
            break;
          case "automate":
            control[pin].automate = value;
            message =
              "Device control set to " + value === true
                ? "Automatic"
                : "Manual";
            controlUpdated = true;
            break;
          default:
            return res.status(400).send({ message: "Invalid mode" });
        }
      }
    });
    if (!controlUpdated) {
      res.status(404).send({ message: "Control not found" });
    }
    await userProduct.save();
    res.status(200).send({ message: message });
  } catch (error) {
    console.error("Error setting control:", error);
    res.status(500).send({ message: "Failed to set control" });
  }
};

module.exports = {
  setPower,
};
