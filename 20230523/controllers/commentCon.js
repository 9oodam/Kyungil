const {User, Post, Comment} = require("../models");

exports.commentView = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Comment.findAll({where : {post_id : id}});
        res.render('comment', {data, id});
    } catch (error) {
        console.log(error);
    }
}

exports.commentInsert = async (req, res) => {
    try {
        const {acc_decoded} = req;
        const {content} = req.body;
        const {id} = req.params; // post.id

        console.log(id);
    
        await Comment.create({
            content : content,
            name : acc_decoded.name,
            user_id : acc_decoded.id,
            post_id : id
        });
    
        res.redirect(`/board/commentView/${id}`);
    } catch (error) {
        console.log(error);
    }
}

exports.commentDelete = async (req, res) => {
    const {id} = req.params; // comments.id
    const comment = await Comment.findOne({where : {id : id}});
    console.log(comment.post_id);
    try {
        await Comment.destroy({
            where : {id : id}
        });
        res.redirect(`/board/commentView/${comment.post_id}`);
    } catch (error) {
        console.log(error);
    }
}