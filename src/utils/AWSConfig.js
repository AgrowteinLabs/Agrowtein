/* const AWS = require("aws-sdk");
const mqtt = require("mqtt");
const fs = require("fs");
const https = require("https");

const caCert = fs.readFileSync("src/assets/certificates/AmazonRootCA1.pem");
const agent = new https.Agent({
  ca: caCert,
  rejectUnauthorized: false,
});
// AWS IoT Data client for publishing commands
const iotdata = new AWS.IotData({
  endpoint: process.env.ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  httpOptions: {
    agent: agent,
  },
});

// MQTT client for receiving feedback
const mqttClient = mqtt.connect({
  host: process.env.ENDPOINT,
  protocol: "mqtts",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  rejectUnauthorized: false,
  httpOptions: {
    agent: agent,
  },
  reconnectPeriod: 1000,
});

// Function to send a command to an ESP32 and wait for feedback
async function sendCommandToESP32(uid, command) {
  const commandTopic = `esp32/${uid}/sub`;
  const feedbackTopic = `esp32/feedback/pub`;
  const payload = JSON.stringify({ command });
  const params = {
    topic: commandTopic,
    payload: payload,
    qos: 1,
  };

  return new Promise((resolve, reject) => {
    // Temporary listener for feedback from the ESP32
    const onMessage = (receivedTopic, message) => {
      if (receivedTopic === feedbackTopic) {
        try {
          const feedbackData = JSON.parse(message.toString());
          console.log(`Received feedback from ESP with UID: ${uid}:`, feedbackData);
    
          const feedback = feedbackData.Feedback; // Extract the specific feedback value if needed
    
          mqttClient.unsubscribe(feedbackTopic, (err) => {
            if (err) {
              console.error("Error unsubscribing from feedback topic:", err);
            }
          });
          mqttClient.off("message", onMessage);
    
          resolve(feedback); // Return the feedback to the caller
        } catch (parseError) {
          console.error("Failed to parse feedback message:", parseError);
          reject(parseError);
        }
      }
    };    

    // Subscribe to the feedback topic
    mqttClient.subscribe(feedbackTopic, (err) => {
      if (err) {
        console.error(
          `Failed to subscribe to feedback topic: ${feedbackTopic}`,
          err
        );
        return reject(err);
      }

      console.log(`Subscribed to feedback topic: ${feedbackTopic}`);

      // Publish the command to the ESP32
      iotdata.publish(params, (publishErr) => {
        if (publishErr) {
          console.error("Failed to publish to MQTT topic:", publishErr);
          mqttClient.unsubscribe(feedbackTopic);
          mqttClient.off("message", onMessage);
          return reject(publishErr);
        }

        console.log(`Successfully published to MQTT topic: ${commandTopic}`);

        // Set a listener for feedback messages
        mqttClient.on("message", onMessage);

        // Set a timeout to reject if no feedback is received within a specified time
        setTimeout(() => {
          mqttClient.unsubscribe(feedbackTopic);
          mqttClient.off("message", onMessage);
          reject(
            new Error(
              "Timeout: No feedback received from ESP32 within the expected time."
            )
          );
        }, 10000); // Adjust the timeout duration as needed (e.g., 10000 ms = 10 seconds)
      });
    });
  });
}

module.exports = { sendCommandToESP32 };
 */