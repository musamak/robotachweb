var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Robotach', menuValue: 'home'  });
});

// POST route from Home>Subscribe form
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
    from: req.body.email,
    to: req.app.locals.contactus_email_uauth+'; '+req.app.locals.contactus_additional_email,
    cc: req.app.locals.contactus_cc_emailadds,
    bcc: req.app.locals.contactus_bcc_emailadds,
    subject: 'Subscribe Me at robotach.io news letter.',
    text: `Subscribe Me * ${req.body.email}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {      
      console.log(error);
      res.render('index', { title: 'Robotach', menuValue: 'home' });
    }
    else {
      res.render('index', { title: 'Robotach', menuValue: 'home' });
    }
  });
});

module.exports = router;
