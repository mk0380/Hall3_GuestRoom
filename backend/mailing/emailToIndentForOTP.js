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
    subject: 'Guest Room Booking OTP for Hall 3 - Action Required',
    template: 'emailToIndentForOTP',
    context: {
      title: 'Guest Room Booking OTP for Hall 3 - Action Required',
      name: name,
      otp: otp,

    }

  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { emailToIndentorForOTP }
