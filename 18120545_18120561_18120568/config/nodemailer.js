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
        html: `<b>Link: </b> <hr> <a href=${urlConfirm}>${urlConfirm}</a>`, // html body
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
