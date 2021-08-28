var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactus', { title: 'Contact us - Robotach', menuValue: 'contactus', postSuccess: ''  });
});

// POST route from contact form
router.post('/', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: req.app.locals.contactus_email_host,
    port: req.app.locals.contactus_email_port,
    secure: req.app.locals.contactus_email_secure,
    auth: {
      user: req.app.locals.contactus_email_uauth,
      pass: req.app.locals.contactus_email_psecure
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.cemail + '&gt;',
    to: req.app.locals.contactus_email_uauth+'; '+req.app.locals.contactus_additional_email,
    cc: req.app.locals.contactus_cc_emailadds,
    bcc: req.app.locals.contactus_bcc_emailadds,
    subject: 'New message from contact form at robotach.io',
    text: `${req.body.name} (${req.body.cemail}) says: \r\n \r\n ${req.body.message} \r\n \r\n ${req.body.name} \r\n ${req.body.phone}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contactus', { title: 'Contact us - Robotach', menuValue: 'contactus', postSuccess: 'Failed to send message.' });
      console.log(error);
    }
    else {
      res.render('contactus', { title: 'Contact us - Robotach', menuValue: 'contactus', postSuccess: 'Message sent successfully.' });
    }
  });
});

module.exports = router;
