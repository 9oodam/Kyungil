const {User, Post} = require("../models");

exports.viewAllList = async (req, res) => {
    try {
        const post = await Post.findAll().then((e) => {
            const data = e.map((i)=>i.dataValues);
            return data;
        });
        const user = await User.findAll().then((e) => {
            const data2 = e.map((i)=>i.dataValues);
            return data2;
        });
        res.json({post, user});
    } catch (error) {
        console.log(error);
    }
}

exports.insertList = async (req, res) => {
    try {
        const {acc_decoded} = req;
        const {title, detail} = req.body;

        const user = User.findOne({where : {user_id : acc_decoded.user_id}});

        await Post.create({
            title : title,
            detail : detail,
            user_id : user.id
        });

        res.redirect('http://127.0.0.1:5500/20230526/frontEnd/list.html');
    } catch (error) {
        console.log(error);
    }
}