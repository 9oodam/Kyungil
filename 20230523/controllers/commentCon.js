const {User, Post, Comment} = require("../models");

exports.commentView = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Comment.findAll({where : {post_id : id}});
        res.render('board', {data});
    } catch (error) {
        console.log(error);
    }
}

exports.commentInsert = async (req, res) => {
    try {
        const {acc_decoded} = req;
        const {content} = req.body;
        const {id} = req.params;
    
        await Comment.create({
            content : content,
            name : acc_decoded.name,
            user_id : acc_decoded.id,
            post_id : id
        });
    
        res.redirect(`/board/comment/${id}`);
    } catch (error) {
        console.log(error);
    }
}
