const aws4 = require("aws4");

const signMqttUrl = (req, res) => {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, ENDPOINT, AWS_REGION } = process.env;

  const credentials = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    // sessionToken: AWS_SESSION_TOKEN,
  };

  const signed = aws4.sign(
    {
      host: ENDPOINT,
      path: "/mqtt",
      service: "iotdevicegateway",
      region: AWS_REGION,
      method: "GET",
      signQuery: true,
    },
    credentials
  );

  const signedUrl = `wss://${ENDPOINT}${signed.path}`;


  res.status(200).json({ url: signedUrl });
};

module.exports = { signMqttUrl };
