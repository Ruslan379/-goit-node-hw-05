const Jimp = require('jimp');



async function resizeAvatarJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload); //! записывает ИЗМЕНЕННЫЙ аватар-image под ТЕМ ЖЕ ИМЕНЕМ во временную папку E:\GoIT\Code\goit-node-hw-05\tmp\
};

module.exports = resizeAvatarJimp;