const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");


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
        // await User.findByIdAndUpdate(req.user._id, { avatarURL });

        await User.findByIdAndUpdate(req.user._id, { avatarURL });

        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;