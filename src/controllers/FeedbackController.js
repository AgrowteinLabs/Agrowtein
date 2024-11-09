const { completeCommand, feedbackStore } = require("../utils/FeedbackStore");
const UserProduct = require("../models/UserProduct");

const handleFeedback = async (req, res) => {
  const { uid, feedback } = req.body;
  console.log(`Received feedback: ${feedback} for uid: ${uid}\n`);
  const commandDetails = feedbackStore.get(uid);
  if (!commandDetails) {
    console.log("No command awaiting feedback");
    return res.status(400).send({ message: "No command awaiting feedback" });
  }

  const { command, pin, controlId, value } = commandDetails;

  if (feedback === command) {
    await updateControlState(
      uid,
      pin,
      controlId,
      value == "on" ? "ON" : value == "off" ? "OFF" : "ERROR"
    );
    completeCommand(uid, feedback);
  } else {
    await updateControlState(uid, pin, controlId, "ERROR");
    completeCommand(uid, "ERROR");
  }
  res.status(200).json({ message: "Feedback processed" });
};

const updateControlState = async(uid, pin, controlId, newState) =>{
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

module.exports = { handleFeedback, updateControlState };
