const emailList = require('./emailRecipients');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'ic2.dashboard@gmail.com',
      refreshToken: '1/YpCLb6jDzAYF7ouC_tqmX1jNnjIGx-Gg5RoU1OUDXkE',
      clientId: '719528510666-4no6i07egne6r8ii6214p4321cg9o6j7.apps.googleusercontent.com',
      clientSecret: '4sggDA-uaVm0hmEpxNZvomNa',
      accessToken: 'ya29.GlsOBMB0iK0_wnf5gRFXj7t6cPbN4quXTUGRZ_cgg9PDM7pgcAQvDm4IE_DYEo2A2lL3VF6dpeABPVhoc6-2hEh-7a48cooyeB5kXT1UE-aOWQXkXrXd5hCT3syd',
      expires: 3600
  }
  
});

var util = {
    send: function (name, data) {

        const feed = name.toUpperCase();

        // setup email options
        let mailOptions = {
            from: 'ic2.dashboard@gmail.com', // sender address
            to: emailList.recipients, // list of receivers
            subject: `HTTP 500 - ${feed}`, // Subject line
            html: `<p> ${feed} has been in Status 500 since ${data.timeFirstOccured} </p>` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

    }
};

module.exports = util;



