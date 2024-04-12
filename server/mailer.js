

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "afcdcddfa29ca99ff16996676b0c9aae"
    }
  });

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"info@demomailtrap.com', // sender address
    to: "paulmarrottweaver@gmail.com", // list of receivers
    subject: "PROGRESS", // Subject line
    text: "Holy Guacamole! We can email from VS code now!!", // plain text body
    
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
