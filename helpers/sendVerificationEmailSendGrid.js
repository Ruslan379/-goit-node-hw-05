const sgMail = require('@sendgrid/mail');
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//-----------------------------------------------------------------------------

const sendVerificationEmailSendGrid = async (data) => {
    try {
        // const msg = {
        //     to: email,
        //     from: 'nsor@ukr.net', //! Use the email address or domain you verified above
        //     subject: 'Thank you for registration with SendGrid!',
        //     text: '...and easy to do anywhere, even with Node.js and SendGrid',
        //     html: '<h1>...and easy to do anywhere, even with Node.js and SendGrid</h1>',
        // };
        const msg = { ...data, from: "nsor@ukr.net" }
        await sgMail.send(msg);
        console.log("Email send using SendGrid success!".bgGreen.black);
        console.log("");
    } catch (error) {
        throw error;
    }
};

module.exports = sendVerificationEmailSendGrid
