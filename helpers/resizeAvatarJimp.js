const Jimp = require('jimp');


//! Jimp-2
async function resizeAvatarJimp(tempUpload) {
    //! Read the image.
    const image = await Jimp.read(tempUpload);
    //! 2-вариант
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает измененный image во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

module.exports = resizeAvatarJimp;