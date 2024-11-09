const AWS = require("aws-sdk");
const fs = require("fs");
const https = require("https");
const UserProduct = require("../models/UserProduct");
const { addCommand } = require("../utils/FeedbackStore");
//const { sendCommandToESP32 } = require("../utils/AWSConfig");

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
  const { uid, pin, controlId, value } = req.body;
  if (!uid || !pin || !controlId || !value) {
    return res
      .status(400)
      .send({ message: "uid, pin, controlId and value are required" });
  }

  try {
    const command = `${pin}${value}`;
    addCommand(uid, command, res);
    await sendCommandToESP32(uid, command);
  } catch (error) {
    console.error("Error sending command:", error);
    await updateControlState(uid, pin, controlId, "ERROR");
    res.status(500).send({ message: "Failed to send command" });
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
  const mode = req.query.mode;
  const { uid, pin, controlId, value } = req.body;
  if (!mode || !uid || !pin || !controlId || !value) {
    return res.status(400).send({
      message: "mode, uid, pin, controlId and value are required",
    });
  }
  try {
    const command = `${pin}_${mode}_${value}`;
    await sendCommandToESP32(uid, command);
    const userProduct = await UserProduct.findOne({ uid: uid }).exec();
    if (!userProduct) {
      return res.status(404).send({ message: "User product not found" });
    }
    let message = "";
    let controlUpdated = false;
    userProduct.controls.forEach((control) => {
      if (control.get(pin) && control.get(pin).controlId === controlId) {
        switch (mode) {
          case "threshhold":
            control.set(pin).threshHold = value;
            message = "Threshhold set successfully";
            controlUpdated = true;
            break;
          case "bypass":
            control.set(pin).bypass = value;
            message = "Control Bypassed Successfully";
            controlUpdated = true;
            break;
          case "automate":
            control.set(pin).automate = value;
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
