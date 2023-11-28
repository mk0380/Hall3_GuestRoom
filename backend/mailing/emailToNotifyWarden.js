const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');


const emailToNotifyWarden = (email) => {

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
    subject: 'Request for Guest Room Booking - Action Required',
    template: 'emailToNotifyWarden',
    context: {
      title: 'Request for Guest Room Booking - Action Required'
    }

  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Notify Warden mail sent successfully");
    }
  });
}

module.exports = { emailToNotifyWarden }
