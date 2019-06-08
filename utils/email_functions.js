const nodemailer = require('nodemailer');

const dotenv = require('dotenv').config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'stefanomartinengo3@gmail.com',
      pass: process.env.email_password
    }
  });

  var mailOptions = {
       from: 'stefanomartinengo3@gmail.com',
       to: 'stefanomartinengo3@gmail.com',
       subject: 'Another Plex Interaction',
   };
module.exports = {
    sendMail: async (formatted_result) => {
        mailOptions.text = formatted_result;
        mailOptions.subject = (formatted_result.split('\n')[2]).substr(7) + 'is watching...';
    let email_sent = await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return email_sent;
        }
    });
    }
}