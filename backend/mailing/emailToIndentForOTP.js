const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');


const emailToIndentorForOTP = (name,otp,email) => {

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
    subject: 'Guest Room Booking OTP for Hall 3',
    template: 'emailToIndentForOTP',
    context: {
      title: 'Guest Room Booking OTP for Hall 3',
      name: name,
      otp: otp,

    }

  };

  var success = false, message=null

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("OTP mail sent successfully");
    }
  });
}

module.exports = { emailToIndentorForOTP }
