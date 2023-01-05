const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");


//-----------------------------------------------------------------------------
const uploadController = async (req, res) => {


    res.status(200).json({
        status: "success filesController",
        code: 200,

    })
};


module.exports = uploadController
