import nodemailer from "nodemailer";

export const createMailTransporter = async () => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ID, // generated ethereal user
      pass: process.env.PW, // generated ethereal password
    },
  });

  // send mail with defined transport object
  /*  let info = await transporter.sendMail({
    from: '"Dawum Nam" <dawumnam@gmail.com>', // sender address
    to: "dawumnam@gmail.com", // list of receivers
    subject: "Password Recovery", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }); */

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
