// feedbackHandler.js
const { completeCommand } = require("../utils/FeedbackStore");
const UserProduct = require("../models/UserProduct");

const handleFeedback = async (req, res) => {
  const { uid, feedback } = req.body;

  // Extract command and other details from feedbackStore
  const commandDetails = feedbackStore.get(uid);
  if (!commandDetails) {
    return res.status(400).send({ message: "No command awaiting feedback" });
  }

  const { command, pin, controlId } = commandDetails;

  // Check if the feedback matches the expected pattern (e.g., "p1onc" for "p1on")
  if (feedback === `${command}c`) {
    await updateControlState(uid, pin, controlId, "ON"); // Update to "ON" if feedback is positive
    completeCommand(uid, feedback);
  } else {
    await updateControlState(uid, pin, controlId, "ERROR"); // Set "ERROR" if feedback does not match
    completeCommand(uid, "ERROR");
  }

  res.status(200).send({ message: "Feedback processed" });
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

module.exports = handleFeedback;