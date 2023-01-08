const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
//! Jimp
const Jimp = require('jimp');


//----------------------------------------------------------------------------------
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    console.log(req.user); //!

    const { path: tempUpload, originalname } = req.file;
    // const { _id: id } = req.user;
    const { id: userId } = req.user
    // const imageName = `${id}_${originalname}`;
    const imageName = `${userId}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join("public", "avatars", imageName);
        console.log();

        //! Jimp
        // Jimp.read(avatarURL)
        //     .then(avatarURL => {
        //         return image
        //             .resize(250, 250) // resize
        //             .quality(60) // set JPEG quality
        //             .greyscale() // set greyscale
        //             // .write(`Jimp_${imageName}`); // save
        //             .write("250x250.png"); // save
        //     })
        //     .catch(err => {
        //         console.log(err);
        // });

        //----------------------------------------------------------------------------
        //! Jimp
        async function resizeAvatar() {
            //! Read the image.
            const image = await Jimp.read(avatarURL);
            //! 2-вариант
            await image
                .resize(250, 250)
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .writeAsync(`./tmp/Jimp_${imageName}_250x250.png`); //! Save and overwrite the image
            // .writeAsync(`${imageName}_150x150.png`); //! записывает в корень папки проекта ./
            //! 1-вариант
            // const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
            // await image.resize(250, 250);
            // await image.greyscale() // set greyscale
            // await image.writeAsync(`./tmp/${imageName}_250x250.png`); //! Save and overwrite the image
            // console.log("image:", image); //!
        }
        resizeAvatar();

        //----------------------------------------------------------------------------

        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });

        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;