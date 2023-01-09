const { changeImageByJimp } = require("../helpers")

const {
    resize400ByJimp,
    resize250Qual60ByJimp,
    resize250GreyByJimp,
    resize250Qual60GreyByJimp
} = changeImageByJimp

const resize250Qual60GreyByJimpMiddleware = async (req, res, next) => {
    console.log("");

    const { path: tempUpload, destination, originalname } = req.file;

    console.log("ОБЪЕКТ -> req.file:".red, req.file); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к временной папке tmp -> destination:".bgYellow.black, destination.yellow); //!;
    console.log("");
    console.log("ПОЛНЫЙ путь к ориг. файлу аватара во временной папке tmp -> tempUpload:".bgBlue, tempUpload.red); //!;
    console.log("");

    // await resize400ByJimp(tempUpload);
    // await resize250Qual60ByJimp(tempUpload);
    // await resize250GreyByJimp(tempUpload);
    await resize250Qual60GreyByJimp(tempUpload);
    next();
};

module.exports = resize250Qual60GreyByJimpMiddleware;

// jimpResize250QualBWMiddleware --> resize250Qual60GreyByJimpMiddleware