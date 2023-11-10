const path = require('path')
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');


export const emailToIndentorForOTP = () =>{

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
          partialsDir: path.resolve('./views'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./views'),
        extName: ".handlebars",
      }
      
      transporter.use('compile', hbs(handlebarOptions));
      
      var mailOptions = {
        from: process.env.EMAIL_USER,
        to: "toemail@gmail.com",
        subject: 'Sending Email using Node.js',
        template: 'email1',
        context: {
          title: 'Title Here',
          text: "Lorem ipsum dolor sit amet, consectetur..."
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
