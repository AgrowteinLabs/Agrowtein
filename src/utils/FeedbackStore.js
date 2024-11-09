const { updateControlState } = require("../controllers/FeedbackController");

const feedbackStore = new Map();

function addCommand(
  uid,
  command,
  pin,
  controlId,
  value,
  res,
  timeoutDuration = 5000
) {
  const timeout = setTimeout(() => {
    if (feedbackStore.has(uid)) {
      feedbackStore.delete(uid);
      updateControlState(uid, pin, controlId, "ERROR");
      res.status(408).send({ message: "Failed to send command." });
    }
    else
    res.status(200).json({ message: "Command sent successfully" });
  }, timeoutDuration);
  feedbackStore.set(uid, { command, pin, controlId, value, res, timeout });
}

function completeCommand(uid, feedback) {
  if (feedbackStore.has(uid)) {
    const { command, timeout } = feedbackStore.get(uid);
    if (feedback === command) {
      clearTimeout(timeout);
      feedbackStore.delete(uid);
    }
  }
}

function removeCommand(uid) {
  feedbackStore.delete(uid);
}

module.exports = { addCommand, completeCommand, removeCommand, feedbackStore };
