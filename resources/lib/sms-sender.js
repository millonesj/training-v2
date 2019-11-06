const twilio = require('twilio');
const config = require('../../config');
const client = new twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);

const sendSMS = (toCellphone, verificationCode) => {
  client.messages.create({
      body: `Hi, Your code verification is ${verificationCode}.`,
      to: `+51${toCellphone}`,  // Text this number
      from: config.FROM_CELLPHONE // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));

}

module.exports = sendSMS
