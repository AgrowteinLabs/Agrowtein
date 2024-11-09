// feedbackStore.js
const feedbackStore = new Map();

function addCommand(uid, command, res, timeoutDuration = 5000) {
  const timeout = setTimeout(() => {
    if (feedbackStore.has(uid)) {
      const { res } = feedbackStore.get(uid);
      res.status(500).json({ message: "Failed to receive feedback" });
      feedbackStore.delete(uid);
    }
  }, timeoutDuration);

  feedbackStore.set(uid, { command, res, timeout });
}

function completeCommand(uid, feedback) {
  if (feedbackStore.has(uid)) {
    const { command, res, timeout } = feedbackStore.get(uid);

    // Check if feedback matches the command (e.g., "p1on" => "p1onc")
    if (feedback === `${command}c`) {
      clearTimeout(timeout);
      res.status(200).json({ message: "Command sent successfully" });
      feedbackStore.delete(uid);
    }
  }
}

function removeCommand(uid) {
  feedbackStore.delete(uid);
}

module.exports = { addCommand, completeCommand, removeCommand };
