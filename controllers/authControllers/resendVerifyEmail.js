const { NotFound, BadRequest } = require('http-errors');
const { User } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const resendVerifyEmail = async (req, res, next) => {
    console.log(""); //!

    const { email } = req.body;

    if (!email) {
        //! ===========================console============================
        console.log("Поле email являестя обязательным!!!".yellow); //!
        lineBreak();
        //! ==============================================================
        throw new NotFound(`Missing required field email`)
    };

    const user = await User.findOne({ email });

    if (!user) {
        //! ===========================console============================
        console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким email:".yellow, email.red); //!
        lineBreak();
        //! ==============================================================
        throw new NotFound(`User not found`)
    };

    if (user.verify) {
        //! ===========================console============================
        console.log("ПОЛЬЗОВАТЕЛЬ с таким email: ".bgYellow.black, email.bgWhite.red, " уже верифицирован!".bgYellow.black); //!
        lineBreak();
        //! ==============================================================
        throw new BadRequest(`Verification has already been passed`)
    };





    // await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    //! ===========================console============================
    // console.log("verifyEmail-->user:".bgYellow.red); //?
    // console.log(user);
    // lineBreak();
    //! ==============================================================

    //! Мой вариант
    // res.status(200).json({
    //     message: "Verification successful",
    //     status: "success",
    //     code: 200,
    //     data: { user },
    // });

    //! Как в ДЗ-6
    res.json({
        message: "Verification email sent",
        // status: "success",
        // code: 200,
        data: { user }
    });
};

module.exports = resendVerifyEmail;