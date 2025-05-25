const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserProduct = require("../models/UserProduct");
const Product = require("../models/Product");
const ProductData = require("../models/ProductData");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const GeneralAssistantID = "asst_66ZpjB0PthdkDOvjO51dWBYj";
const UserAssistantID = "asst_dTvKcxAanv1dbod0hW3fAQLB";


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
      session_id : thread_id,
    });

  } catch (error) {
    console.error("❌ Error in GeneralBot:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


const CreateReport = async (req, res) => {
  try {
    const { uid } = req.params;

    // 1. Fetch the user's farm document
    const farmDoc = await UserProduct.findOne({ uid });
    if (!farmDoc) return res.status(404).json({ message: "Farm not found." });

    let thread_id = farmDoc.session_id;

    // 2. Validate thread or create new one
    let isValidThread = true;
    if (thread_id) {
      try {
        await openai.beta.threads.retrieve(thread_id);
      } catch (err) {
        if (err.status === 404) {
          isValidThread = false;
        } else {
          throw err;
        }
      }
    }

    if (!thread_id || !isValidThread) {
      const thread = await openai.beta.threads.create();
      thread_id = thread.id;
      await UserProduct.updateOne({ uid }, { session_id: thread_id });
    }

    // 3. Get 7-day interval timestamps
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 4. Convert to ISO string format for Mongo
    const formattedStart = startDate.toISOString();
    const formattedEnd = endDate.toISOString();

    // 5. Fetch interval sensor data using ProductData aggregation
    const intervalMs = 60 * 60 * 1000; // 1 hour in ms
    const data = await ProductData.aggregate([
      {
        $match: {
          uid,
          timestamp: {
            $gte: new Date(formattedStart),
            $lte: new Date(formattedEnd),
          },
        },
      },
      { $sort: { timestamp: 1 } },
      {
        $group: {
          _id: {
            $toLong: {
              $subtract: [
                { $toLong: "$timestamp" },
                { $mod: [{ $toLong: "$timestamp" }, intervalMs] }
              ]
            }
          },
          data: { $first: "$data" },
          timestamp: { $first: "$timestamp" }
        }
      },
      { $sort: { timestamp: 1 } },
      { $project: { _id: 0, data: 1, timestamp: 1 } }
    ]);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No data found for past 7 days." });
    }

    // 6. Fetch farm description from Product schema
    const description = farmDoc?.description || "No description available.";

    // 7. Construct payload to send to assistant
    const reportRequest = {
      description,
      sensor_data: data
    };

    // 8. Post message to the thread
    await openai.beta.threads.messages.create(thread_id, {
      role: "user",
      content: `Please analyze the following farm data and generate a report:\n\n${JSON.stringify(reportRequest)}`
    });

    // 9. Run assistant on the thread
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: UserAssistantID,
    });

    // 10. Poll until run completes
    let runStatus;
    do {
      runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id);
      if (runStatus.status === "completed") break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } while (runStatus.status !== "completed");

    // 11. Fetch the assistant's message
    const messages = await openai.beta.threads.messages.list(thread_id);
    const lastMessage = messages.data[0]?.content[0]?.text?.value || "No report generated.";

    // 12. Return the final report
    return res.status(200).json({
      report: lastMessage,
    });

  } catch (error) {
    console.error("❌ Error in CreateReport:", error);
    return res.status(500).json({
      message: error.message || "Failed to generate report",
    });
  }
};

const UserBot = async (req, res) => {
  try {
    const { uid, question } = req.body;

    console.log("🟢 Question received:", question);
    console.log("🟢 UID received:", uid);

    if (!uid || !question) {
      return res.status(400).json({ message: "UID and question are required." });
    }

    // 1. Find the product by UID
    const userProduct = await UserProduct.findOne({ uid });
    if (!userProduct) {
      return res.status(404).json({ message: "No product found for given UID." });
    }

    let thread_id = userProduct.session_id;

    // 2. Check if thread_id is valid or expired
    if (thread_id) {
      try {
        await openai.beta.threads.retrieve(thread_id);
        console.log("🟢 Valid thread found:", thread_id);
      } catch (err) {
        if (err.status === 404) {
          console.log("⚠️ Thread expired or not found. Creating a new one...");
          const newThread = await openai.beta.threads.create();
          thread_id = newThread.id;

          // Update in DB
          userProduct.session_id = thread_id;
          await userProduct.save();
        } else {
          throw err;
        }
      }
    } else {
      console.log("🆕 No thread found. Creating new thread...");
      const newThread = await openai.beta.threads.create();
      thread_id = newThread.id;

      userProduct.session_id = thread_id;
      await userProduct.save();
    }

    // 3. Post message to the assistant thread
    await openai.beta.threads.messages.create(thread_id, {
      role: "user",
      content: question,
    });

    // 4. Run the assistant on that thread
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: UserAssistantID,
    });

    // 5. Wait until assistant run completes
    let runStatus;
    do {
      runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id);
      if (runStatus.status === "completed") break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } while (runStatus.status !== "completed");

    // 6. Get the last assistant message
    const messages = await openai.beta.threads.messages.list(thread_id);
    const latest = messages.data[0]?.content[0]?.text?.value || "";

    // 7. Return to frontend
    return res.status(200).json({
      answer: latest,
    });

  } catch (error) {
    console.error("❌ Error in UserBot:", error);
    return res.status(error.status || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = { GeneralBot, CreateReport, UserBot };