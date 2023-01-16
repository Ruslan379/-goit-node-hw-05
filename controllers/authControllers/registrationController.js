const { User } = require("../../models/userModel.js");
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs");
//* gravatar
const gravatar = require("gravatar");

//? ----------------------- SendGrid -----------------------
// const sgMail = require('@sendgrid/mail');
// require("dotenv").config();
// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { sendVerificationEmail } = require("../../helpers");
//? _______________________ SendGrid _______________________

//todo ------------------- Nodemailer -------------------
const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD } = process.env;
//todo ___________________ Nodemailer ____________________


//-----------------------------------------------------------------------------
const registrationController = async (req, res) => {
    const { email, password } = req.body;
    const userMailCheck = await User.findOne({ email });

    //! ПРОВЕРКА - если email уже используется кем-то другим:
    if (userMailCheck) {
        throw new Conflict(`Email ${email} in use`)
    }

    //! ------------------------ Хеширование и засолка password --------------------------
    //? 1-вариант
    //! Пароль в явном виде (если не используется хеширование и засолка в userSchema (1 вариант))
    // const newUser = await User.create({ email, password }); 

    //? 2-вариант (самый простой)
    //!  Хеширование и засолка password с помошью bcryptjs (или bcrypt)
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    // const newUser = await User.create({ email, password: hashPassword }); 

    //* gravatar
    const avatarURL = gravatar.url(email);

    //? 3-вариант (самый сложный)
    //!  Хеширование и засока password с помошью bcryptjs (или bcrypt) используется в userSchema
    const newUser = new User({ email, avatarURL }); //* gravatar
    await newUser.setPassword(password);
    await newUser.save();
    //! _______________________ Хеширование и засолка password _________________________

    console.log("\nnewUser:".green, newUser); //!

    //? ------------------- SendGrid -------------------
    const dataSendGrid = {
        to: email,
        // from: 'nsor@ukr.net', // Use the email address or domain you verified above
        subject: 'Thank you for registration-4!',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<h1>and easy to do anywhere, even with Node.js</h1>',
    };
    // sendVerificationEmail(dataSendGrid); //? отправка подтверждениия (верификации) на email пользователя

    //? OLD
    // const msg = {
    //     to: email,
    //     from: 'nsor@ukr.net', // Use the email address or domain you verified above
    //     subject: 'Thank you for registration-3!',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<h1>and easy to do anywhere, even with Node.js</h1>',
    // };
    // await sgMail.send(msg);
    // console.log("Email send using SendGrid success!".bgGreen.black);
    // console.log("");
    //? ___________________ SendGrid ____________________


    //todo ------------------- Nodemailer -------------------
    // Объект конфикурации META:
    const nodemalierConfig = {
        host: "smtp.meta.ua",
        port: 465, // 25, 465, 2255
        secure: true,
        auth: {
            user: "arnov@meta.ua",
            pass: META_PASSWORD,
        }
    };

    const transporter = nodemailer.createTransport(nodemalierConfig);

    const dataNodemailer = {
        to: email,
        from: 'arnov@meta.ua', // Use the email address or domain you verified above
        subject: 'Thank you for registration-5!',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<h1>and easy to do anywhere, even with Node.js</h1>',
    };

    await transporter.sendMail(dataNodemailer);
    console.log("Email send using Nodemailer success!".bgCyan.black);
    console.log("");
    // .then(() => console.log("Email send using Nodemailer success!".bgCyan.black))
    // .catch(error => console.log(error.message));
    //todo ___________________ Nodemailer ____________________

    res.status(201).json({
        // status: "success",
        code: 201,
        user: {
            email,
            subscription: newUser.subscription,
            avatarURL //* gravatar
        }
    });
};


module.exports = registrationController;


