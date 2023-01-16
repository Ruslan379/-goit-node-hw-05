const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD } = process.env;


//-----------------------------------------------------------------------------
const USER_EMAIL = "arnov@meta.ua";

// Объект конфигурации META:
const nodemalierConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2255
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: META_PASSWORD,
    }
};

const transporter = nodemailer.createTransport(nodemalierConfig);


const sendVerificationEmailNodemailer = async (data) => {
    try {

        // const dataNodemailer = {
        //     to: email,
        //     from: 'arnov@meta.ua', //! Use the email address or domain you verified above
        //     subject: 'Thank you for registration with Nodemailer-2!',
        //     text: '...and easy to do anywhere, even with Node.js and Nodemailer',
        //     html: '<h1>...and easy to do anywhere, even with Node.js and Nodemailer</h1>',
        // };

        const dataNodemailer = { ...data, from: USER_EMAIL };

        const info = await transporter.sendMail(dataNodemailer);
        console.log("");
        console.log("info =".bgCyan.black, info);
        console.log("");
        console.log("Email send using Nodemailer success!".bgCyan.black);
        console.log("");
        return true;

    } catch (error) {
        throw error;
    }
};

module.exports = sendVerificationEmailNodemailer

