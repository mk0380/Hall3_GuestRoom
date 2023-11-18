const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');


const sendForgetPasswordMail = (otp,email) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve('./mailing/views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./mailing/views'),
    extName: ".handlebars",
  }

  transporter.use('compile', hbs(handlebarOptions));

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP for Password Change - Guest Room Booking Portal, Hall 3',
    template: 'sendForgetPasswordMail',
    context: {
      title: 'OTP for Password Change - Guest Room Booking Portal, Hall 3',
      otp: otp,

    }

  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("OTP mail for password change sent successfully");
    }
  });
}

module.exports = { sendForgetPasswordMail }
