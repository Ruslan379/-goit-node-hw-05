const { User } = require("../../models/userModel.js");
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs");
//* gravatar
const gravatar = require("gravatar");

//? sendgrid
const sgMail = require('@sendgrid/mail');
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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

    //? sendgrid
    const msg = {
        to: email,
        from: 'nsor@ukr.net', // Use the email address or domain you verified above
        subject: 'Thank you for registration-2!',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<h1>and easy to do anywhere, even with Node.js</h1>',
    };
    await sgMail.send(msg);
    // console.log("");
    console.log("Email send success!".bgGreen.black);
    console.log("");

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


