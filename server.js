const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const config = require("./config.js");

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

const send_mail = (name, recipient) => {
  const accessToken = OAuth2_client.getAccessToken();

  const trasnport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: `Santchou Ghislain 🚀 <${config.user}>`,
    to: recipient,
    subject: "A message from The G.O.A.T",
    html: get_html_message(name),
  };

  trasnport.sendMail(mail_options, (error, result) => {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Success: ", result);
    }
    trasnport.close();
  });
};

const get_html_message = (name) => {
  return `<h2>${name} You're Awesome man. </h2>`;
};

send_mail("ghislain", "gsantchou@gmail.com");
