const nodemailer = require("nodemailer");

const user = process.env.MAIL_ADMIN
const pass = process.env.PASSWORD_ADMIN

exports.sendEmail = (req, receiver, token,  type) =>{

    console.log(receiver);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 8000,
        secure: false, // true for 465, false for other port
        auth: {
            user: 'quachthanhhmd05@gmail.com', // generated ethereal user
            pass: 'lamphatthanh1' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const urlConfirm = `http://${req.headers.host}/buyer/confirm/${token}`;
   
    const mailOptionsConfirmation = {
        from: '<quachthanhhmd05@gmail.com>', // sender address
        to: receiver, // list of receivers
        subject: "Verify your account", // Subject line
        text: "Come with me. Welcome to the new life! \n\n Please click on the below link to verify your account\n", // plain text body
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Please confirm your e-mail</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <style type="text/css">
            body,table,td,a{
            -webkit-text-size-adjust:100%;
            -ms-text-size-adjust:100%;
            }
            table,td{
            mso-table-lspace:0pt;
            mso-table-rspace:0pt;
            }
            img{
            -ms-interpolation-mode:bicubic;
            }
            img{
            border:0;
            height:auto;
            line-height:100%;
            outline:none;
            text-decoration:none;
            }
            table{
            border-collapse:collapse !important;
            }
            body{
            height:100% !important;
            margin:0 !important;
            padding:0 !important;
            width:100% !important;
            }
            a[x-apple-data-detectors]{
            color:inherit !important;
            text-decoration:none !important;
            font-size:inherit !important;
            font-family:inherit !important;
            font-weight:inherit !important;
            line-height:inherit !important;
            }
            a{
            color:#00bc87;
            text-decoration:underline;
            }
            * img[tabindex=0]+div{
            display:none !important;
            }
            @media screen and (max-width:350px){
            h1{
            font-size:24px !important;
            line-height:24px !important;
            }
            }   div[style*=margin: 16px 0;]{
            margin:0 !important;
            }
            @media screen and (min-width: 360px){
            .headingMobile {
            font-size: 40px !important;
            }
            .headingMobileSmall {
            font-size: 28px !important;
            }
            }
          </style>
        </head>
        <body bgcolor="#ffffff" style="background-color: #ffffff; margin: 0 !important; padding: 0 !important;">
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> - to finish signing up, you just need to confirm that we got your e-mail right within 48 hours. To confirm please click the VERIFY button.</div>
          <center>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" valign="top">
              <tbody>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0" align="center" valign="top" bgcolor="#ffffff" style="padding: 0 20px !important;max-width: 500px;width: 90%;">
                      <tbody>
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 10px 0 0px 0;"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="350">
      <tr>
      <td align="center" valign="top" width="350">
      <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;border-bottom: 1px solid #e4e4e4 ;">
                              <tbody>
                                <tr>
                                  <td bgcolor="#ffffff" align="left" valign="middle" style="padding: 0px; color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 62px;padding:0 0 15px 0;"><a href="https://app.avocode.com" target="_blank"><img width="19" height="25" alt="logo" src="https://s3-eu-west-1.amazonaws.com/avocode-mailing/mailing-app/img/logo.png"></a></td>
                                  <td bgcolor="#ffffff" align="right" valign="middle" style="padding: 0px; color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;padding:0 0 15px 0;"><a href="https://app.avocode.com/login/" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;color: #797979;font-size: 12px;font-weight:400;-webkit-font-smoothing:antialiased;text-decoration: none;">Login to avocode.com</a></td>
                                </tr>
                              </tbody>
                            </table><!--[if (gte mso 9)|(IE)]></td></tr></table>
      <![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 0;"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="350">
      <tr>
      <td align="center" valign="top" width="350">
      <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;border-bottom: 1px solid #e4e4e4;">
                              <tbody>
                                <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding: 20px 0 0 0; color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400;-webkit-font-smoothing:antialiased;">
                                                      <p class="headingMobile" style="margin: 0;color: #171717;font-size: 26px;font-weight: 200;line-height: 130%;margin-bottom:5px;">Verify your e-mail to finish signing up for Avocode</p>
                                  </td>
                                </tr>
                                                  <tr>
                                                    <td height="20"></td>
                                                  </tr>
                                <tr>
                                  <td bgcolor="#ffffff" align="left" style="padding:0; color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400;-webkit-font-smoothing:antialiased;">
                                                      <p style="margin:0;color:#585858;font-size:14px;font-weight:400;line-height:170%;">Thank you for choosing Avocode.</p>
                                                      <p style="margin:0;margin-top:20px;line-height:0;"></p>
                                                      <p style="margin:0;color:#585858;font-size:14px;font-weight:400;line-height:170%;">Please confirm that <b>hello@SmilesDavis.yeah</b> is your e-mail address by clicking on the button below or use this link <a style='color: #00bc87;text-decoration: underline;' target='_blank' href= ${urlConfirm}>${urlConfirm}</a></p>
                                  </td>
                                </tr>
                                                  <tr>
                                                    <td align="center">
                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                          <td align="center" style="padding: 33px 0 33px 0;">
                                                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                                                              <tr>
                                                                <td align="center" style="border-radius: 4px;" bgcolor="#00bc87"><a href= ${urlConfirm} style="text-transform:uppercase;background:#00bc87;font-size: 13px; font-weight: 700; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none !important; padding: 20px 25px; border-radius: 4px; border: 1px solid #00bc87; display: block;-webkit-font-smoothing:antialiased;" target="_blank"><span style="color: #ffffff;text-decoration: none;">Verify</span></a></td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                              </tbody>
                            </table><!--[if (gte mso 9)|(IE)]></td></tr></table>
      <![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td bgcolor="#ffffff" align="center" style="padding: 0;"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="350">
      <tr>
      <td align="center" valign="top" width="350">
      <![endif]-->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;">
                              <tbody>
                                <tr>
                                  <td bgcolor="#ffffff" align="center" style="padding: 30px 0 30px 0; color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 18px;">
                                                      <p style="margin: 0;color: #585858;font-size: 12px;font-weight: 400;-webkit-font-smoothing:antialiased;line-height: 170%;">Need help? Ask at <a href="mailto:team@avocode.com" style="color: #00bc87;text-decoration: underline;" target="_blank">team@avocode.com</a> or visit our <a href="https://help.avocode.com/en/" style="color: #00bc87;text-decoration: underline;" target="_blank">Help Center</a></p>
                                                      <tr>
                                                        <td bgcolor="#ffffff" align="center" style="padding: 0; color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 18px;">
                                                          <p style="margin: 0;color: #585858;font-size: 12px;font-weight: 400;-webkit-font-smoothing:antialiased;line-height: 170%;"></p>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td bgcolor="#ffffff" align="center" style="padding: 15px 0 30px 0; color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 18px;">
                                                          <p style="margin: 0;color: #585858;font-size: 12px;font-weight: 400;-webkit-font-smoothing:antialiased;line-height: 170%;">Avocode, Inc.<br> 330 East 59th Street, 7th Floor<br> New York, NY 10022, USA</p>
                                                        </td>
                                                      </tr>
                                  </td>
                                </tr>
                              </tbody>
                            </table><!--[if (gte mso 9)|(IE)]></td></tr></table>
      <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
      
        
        </body>
      </html>`
       
    }

    const mailOptionsRecovery = {
        from: '<quachthanhhmd05@gmail.com>', // sender address
        to: receiver, // list of receivers
        subject: "Recovery password", // Subject line
        text: `Please copy code to recovery password! \n\n`, // plain text body
        html: `<b>${token}</a>
        '<a>If you did not request this, please ignore this email and your password will remain unchanged.\n</a>'`, // html body
    }

    transporter.sendMail(type === 'confirmation' ? mailOptionsConfirmation : mailOptionsRecovery, (error, data) => {
        if(error){
            console.log({
                msg: 'error',
                error
            })
        }else{
            console.log({
                msg: 'success',
                data
            })
        }
    })
};
