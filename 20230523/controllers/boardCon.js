const {User, Post, Comment} = require("../models");

exports.boardView = async(req, res) => {
    try {
        const data = await Post.findAll();
        const data2 = await Comment.findAll();
        res.render("board", {data, data2});
    } catch (error) {
        console.log(error);
    }
}

exports.boardInsert = async (req, res) => {
    try {
        const {acc_decoded} = req;
        const {title, detail} = req.body;
    
        await Post.create({
            title : title,
            detail : detail,
            name : acc_decoded.name,
            user_id : acc_decoded.id
        });
    
        res.redirect('/board');
    } catch (error) {
        console.log(error);
    }
}

exports.boardDelete = async (req, res) => {
    try {
        await Post.destroy({
            where : {id : req.params.id}
        });
        res.redirect('/board');
    } catch (error) {
        console.log(error);
    }
}

exports.boardSelect = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Post.findOne({where : {id}});
        res.render("update", {data});
    } catch (error) {
        console.log(error);
    }
}

exports.boardUpdate = async (req, res) => {
    try {
        const {title, detail} = req.body;
        const {id} = req.params;
    
        await Post.update({title, detail}, {where : {id}});
        res.redirect('/board');
    } catch (error) {
        console.log(error);
    }
}