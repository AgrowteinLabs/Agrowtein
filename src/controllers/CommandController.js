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
  const payload = JSON.stringify(command);
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
  const { uid, pin, controlId, value } = req.body;
  if (!uid || !pin || !controlId || !value) {
    return res
      .status(400)
      .send({ message: "uid, pin, controlId and value are required" });
  }

  try {
    const command = `${pin}${value}`;
    await sendCommandToESP32(uid, { command });
    await updateControlState(
      uid,
      pin,
      controlId,
      value === "on" ? "ON" : value === "off" ? "OFF" : "ERROR"
    );
    res.status(200).json({ message: "Command sent successfully" });
  } catch (error) {
    console.error("Error sending command:", error);
    await updateControlState(uid, pin, controlId, "ERROR");
    res.status(500).json({ message: "Failed to send command" });
  }
};

async function updateControlState(uid, pin, controlId, newState) {
  const userProduct = await UserProduct.findOne({ uid: uid }).exec();
  if (userProduct) {
    const control = userProduct.controls.find(
      (ctrl) => ctrl.pin === pin && ctrl.controlId === controlId
    );
    if (control) {
      control.state = newState;
      await userProduct.save();
    }
  }
}

const setControls = async (req, res) => {
  try {
    const { mode, uid, pin, controlId, value } = req.body;
    if (!mode || !uid || !pin || !controlId || !value) {
      return res.status(400).send({
        message: "mode, uid, pin, controlId and value are required",
      });
    }
    const userProduct = await UserProduct.findOne({ uid: uid }).exec();
    if (!userProduct) {
      return res.status(404).send({ message: "User product not found" });
    }
    let message = "";
    let payload = {};
    const control = userProduct.controls.find(
      (ctrl) => ctrl.pin === pin && ctrl.controlId === controlId
    );
    if (control) {
      switch (mode) {
        case "threshold":
          control.threshHold = value;
          payload = {
            command: "threshold",
            pin: pin,
            threshold: value,
          };
          message = "Threshold set successfully";
          break;
        case "bypass":
          control.bypass = value;
          payload = {
            command: "bypass",
            pin: pin,
            bypass: value,
          };
          message = "Control Bypassed Successfully";
          break;
        case "automate":
          control.automate = value;
          payload = {
            command: "Auto",
            pin: pin,
            threshold: control.threshHold,
          };
          message = `Device control set to ${
            value === "true" ? "Automatic" : "Manual"
          } mode`;
          break;
        default:
          return res.status(400).send({ message: "Invalid mode" });
      }
      await sendCommandToESP32(uid, payload);
    } else {
      return res.status(404).send({ message: "Control not found" });
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
  setControls,
};
