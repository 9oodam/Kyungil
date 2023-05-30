const {User} = require("../models");

exports.viewProfile = async (req, res) => {
    try {
        const {acc_decoded} = req;
        const user = await User.findOne({where : {user_id : acc_decoded.user_id}});

        console.log(user.dataValues);
        const data = user.dataValues;
        res.json({data});
    } catch (error) {
        console.log(error);
    }
}

exports.modifyProfile = async (req, res) => {
    console.log(req.file.filename);
    const filename = req.file.filename;
    const {acc_decoded} = req;
    try {
        await User.update({img : filename}, {where : {user_id : acc_decoded.user_id}});
        res.redirect('http://127.0.0.1:5500/20230530/profile/frontEnd/profile.html');
    } catch (error) {
        console.log(error);
    }
}