const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "localhost",
  port: "1025",
  auth: null,
});

transport.sendMail({
  from: "test_from <test_from@gmail.com",
  to: "test_to <test_to@gmail.com",
  subject: "test subject",
  html: "<h1>helloworld</h1>",
});
