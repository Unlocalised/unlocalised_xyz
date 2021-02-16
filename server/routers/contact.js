const express = require('express');
const router = express.Router();

const mailer = require("nodemailer");

// Get all skills
router.post('/api/contact', async (req, res) =>{

  try{
    // Use Smtp Protocol to send Email
    const smtpTransport = mailer.createTransport({
      service: "Gmail",
      auth: {
          user: process.env.CONTACT_EMAIL,
          pass: process.env.CONTACT_PASS
      }
    });

    const mail = {
        from: `Website lead <${process.env.CONTACT_EMAIL}>`,
        to: `${process.env.CONTACT_EMAIL}`,
        subject: `${req.body.subject}`,
        text: `${req.body.message}`
    }
    smtpTransport.sendMail(mail, (err, res) =>{
      if(err){
        smtpTransport.close();
        return res.status(400).send(err);
      }
    });

    smtpTransport.close();
    res.send();

  }
  catch(e){
    res.status(500).send({error: 'Email error'});
  }

});

module.exports = router;
