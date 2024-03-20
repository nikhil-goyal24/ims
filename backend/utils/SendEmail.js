const AWS = require("aws-sdk");

const awsConfig = {
  accessKeyId: process.env.awsAccessKey,
  secretAccessKey: process.env.awsSecretkey,
  region: process.env.awsMailRegion,
};

const SES = new AWS.SES(awsConfig);
const sendEmail = async (options) => {
  try {
    const mailOptions = {
      Source: options.from,
      Destination: {
        ToAddresses: [options.to],
      },
      Message: {
        Subject: {
          Data: options.subject,
        },
        Body: {
          Html: {
            Data: options.text,
          },
        },
      },
    };

    return await SES.sendEmail(mailOptions).promise(); // Utilize promise method
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
