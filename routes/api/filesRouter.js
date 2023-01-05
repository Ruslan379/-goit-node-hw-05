const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')

const { controllerWrapper, authMiddleware } = require("../../middlewares")

const { filesControllers: ctrl } = require("../../controllers")


//----------------------------------------------------------------------------
//! 0. Проверка токена
// router.use(authMiddleware);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("./public/output"))
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split(".");
        cb(null, `${filename}.${extension}`);
    },
});


const uploadMiddleware = multer({ storage });

//! 1. POST --> api/files/upload
// content-type: multipart/form-data
router.post("/upload", uploadMiddleware.single("avatar"), controllerWrapper(ctrl.uploadController))




// module.exports = { authRouter: router }
module.exports = router
