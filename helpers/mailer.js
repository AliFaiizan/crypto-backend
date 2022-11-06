const nodemailer= require('nodemailer');

const {google} = require('googleapis');

const sgMail = require('@sendgrid/mail')

const {EMAIL,MAILING_ID,MAILING_REFRESH,MAILING_SECRET,REDIRECT_URI}=process.env;

sgMail.setApiKey(process.env.SENDGRID_VERIFYEMAIL_URI);




module.exports.SendGridVerificationEmail=(targetEmail,name,url) => { 
    const msg = {
      to: targetEmail, // Change to your recipient
      from: EMAIL, // Change to your verified sender
      subject: "Email verification",
      text: "for verifying email",
      html: `<!DOCTYPE html><html>
      <head>
       <title>Verification</title> 
       <style type="text/css"> body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, img { -ms-interpolation-mode: bicubic; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; } @media screen and (max-width:600px) { h1 { font-size: 32px !important; line-height: 32px !important; } } div[style*="margin: 16px 0;"] { margin: 0 !important; } </style>
       </head>
       <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;"> <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        We're thrilled to have you here! Get ready to dive into your new account. </div> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#4269f5" align="center"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#4269f5" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;"> <h1 style="font-size: 48px; font-weight: 400; margin: 2;">
        Hi ${name}</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" /> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p> </td> </tr> <tr> <td bgcolor="#ffffff" align="left"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 3px;" bgcolor="#4269f5">
        <a href= ${url} target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p> </td> </tr> <tr> <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">
        <a href="#" target="_blank" style="color: #4269f5;">${url}</a></p> </td> </tr> <tr> <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">If you have any questions, just reply to this email&mdash;we're always happy to help out.</p> </td> </tr> <tr> <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">Cheers,<br>FaceBook Team</p> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2> <p style="margin: 0;"><a href="#" target="_blank" style="color: #4269f5;">We&rsquo;re here to help you out</a></p> </td> </tr> </table> </td> </tr> <tr> <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> <tr> <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br> <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p> </td> </tr> </table> </td> </tr> </table></body></html>`,
    
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log(`Email sent ${targetEmail}`);
      })
      .catch((error) => {
        console.error(error);
      });
 }
