const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");


//-----------------------------------------------------------------------------
const filesController = async (req, res) => {


    res.status(200).json({
        status: "filesController",
        code: 200,

    })
};


module.exports = filesController
