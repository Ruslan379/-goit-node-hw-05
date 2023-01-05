const express = require('express')
const router = express.Router()

const { controllerWrapper, authMiddleware } = require("../../middlewares")

const { filesControllers: ctrl } = require("../../controllers")



//----------------------------------------------------------------------------
//! 0. Проверка токена
// router.use(authMiddleware);


//! 1. POST --> api/files/upload
router.post("/upload", controllerWrapper(ctrl.filesController))




// module.exports = { authRouter: router }
module.exports = router
