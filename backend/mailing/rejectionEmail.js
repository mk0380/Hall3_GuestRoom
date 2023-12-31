const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const hec = require('../important_data/hall3hec');


const rejectionEmail = (email, reason, name, id) => {

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
    subject: `Rejection of Guest Room Booking Request[Booking ID:${id}]`,
    template: 'rejectionEmail',
    context: {
      title: `Rejection of Guest Room Booking Request[Booking ID:${id}]`,
      reason: reason,
      name:name,
      id:id,
      hec_name:hec[1].name,
      hec_position:hec[1].position
    }

  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Rejection Mail sent successfully");
    }
  });
}

module.exports = { rejectionEmail }
