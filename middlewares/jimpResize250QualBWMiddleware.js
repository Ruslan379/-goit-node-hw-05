const { resizeAvatarJimp } = require("../helpers")


const jimpResize250QualBWMiddleware = async (req, res, next) => {
    console.log("");

    const { path: tempUpload, destination, originalname } = req.file;

    console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к временной папке tmp -> destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к ориг. файлу аватара во временной папке tmp -> tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");

    await resizeAvatarJimp(tempUpload);
    next();
};

module.exports = jimpResize250QualBWMiddleware;