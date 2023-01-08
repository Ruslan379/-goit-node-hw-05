const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
//! Jimp
const Jimp = require('jimp');


//----------------------------------------------------------------------------------
//! Jimp-2
async function resizeAvatar(tempUpload, tempUpload) {
    //! Read the image.
    const image = await Jimp.read(tempUpload);
    //! 2-вариант
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает измененный image в E:\GoIT\Code\goit-node-hw-05\tmp\
};


const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log("avatarsDir:".bgBlue, avatarsDir.blue); //!;


const updateAvatar = async (req, res) => {
    console.log("req.user:".blue, req.user); //!

    const { path: tempUpload, destination, originalname } = req.file;
    console.log("req.file:".red, req.file); //!;
    console.log("");
    console.log("req.file.destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("req.file.path-->tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");

    const { id: userId } = req.user

    const avatarNewName = `${userId}_${originalname}`;
    console.log("avatarNewName:".bgMagenta, avatarNewName.bgGreen.red); //!;
    console.log("");
    console.log("");
    console.log("____________________________________________");

    //----------------------------------------------------------------------------
    //! Jimp-2
    const avatarNewJimpName = `Jimp_250x250_${avatarNewName}`;
    console.log("avatarNewJimpName:".bgMagenta, avatarNewJimpName.bgGreen.red); //!;
    console.log("");
    const avatarTempURL = path.join(destination, avatarNewJimpName);
    console.log("avatarTempURL:".bgRed, avatarTempURL.bgBlue); //!;

    // async function resizeAvatar() {
    //     //! Read the image.
    //     const image = await Jimp.read(tempUpload);
    //     //! 2-вариант
    //     await image
    //         .resize(250, 250)
    //         .quality(60) // set JPEG quality
    //         .greyscale() // set greyscale
    //         .writeAsync(avatarTempURL); //! записывает измененный image в E:\GoIT\Code\goit-node-hw-05\tmp\

    // }
    await resizeAvatar(tempUpload, tempUpload);

    console.log("req.file:".green, req.file); //!;
    console.log("");
    //----------------------------------------------------------------------------


    try {
        // const resultUpload = path.join(avatarsDir, avatarNewName);
        const resultUpload = path.join(avatarsDir, avatarNewJimpName);
        console.log("resultUpload:".bgCyan.black, resultUpload.red); //!;
        console.log("");


        // await fs.rename(tempUpload, resultUpload); //! old
        await fs.rename(tempUpload, avatarTempURL); //! old
        await fs.rename(avatarTempURL, resultUpload);


        const avatarURL = path.join("public", "avatars", avatarNewJimpName);
        console.log("avatarURL:".bgGreen, avatarURL.green); //!;
        console.log("");


        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });

        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;