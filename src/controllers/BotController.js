const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GeneralAssistantID = "asst_66ZpjB0PthdkDOvjO51dWBYj"; // Replace with your Assistant ID

const GeneralBot = async (req, res) => {
  try {
    const { question, session_id } = req.body;

    console.log("🟢 Received question:", question);
    console.log("🟢 Received session_id:", session_id);

    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    let thread_id = session_id;

    // Create new thread if no session exists
    if (!thread_id) {
      const thread = await openai.beta.threads.create();
      thread_id = thread.id;
      console.log("🟢 Created new thread_id:", thread_id);
    }

    // Post the user's question to the thread
    await openai.beta.threads.messages.create(thread_id, {
      role: "user",
      content: question,
    });
    console.log("🟢 Posted message to thread:", thread_id);

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: GeneralAssistantID,
    });
    console.log("🟢 Run initiated:", run.id);

    // Poll until the run completes
    let runStatus;
    do {
      runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id);
      if (runStatus.status === "completed") break;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    } while (runStatus.status !== "completed");

    // Retrieve the latest message in the thread
    const messages = await openai.beta.threads.messages.list(thread_id);
    const lastMessage = messages.data[0]?.content[0]?.text?.value || "";

    console.log("🟢 Assistant response:", lastMessage);

    return res.status(200).json({
      answer: lastMessage,
      session_id: thread_id,
    });

  } catch (error) {
    console.error("❌ Error in GeneralBot:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


const UserBot = async (req, res) => {
  return res.status(501).json({ message: "UserBot is not implemented yet." });
};

module.exports = { GeneralBot, UserBot };
