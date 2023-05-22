const {User, Post} = require("../models");

exports.boardMain = async (req, res) => {
    const {acc_decoded} = req;
    const user = await User.findOne({where : {name : acc_decoded.name}});
    res.render('main', {data : user});
}

exports.boardCreate = async (req, res) => {
    const {acc_decoded} = req;
    const {user_post} = req.body;

    // posts 테이블에 글 추가
    await Post.create({
        msg : user_post,
        user_id : acc_decoded.id
    });

    // 해당 유저가 작성한 글을 볼 수 있는 페이지로 이동
    res.redirect(`/board/view/${acc_decoded.id}`);
}

exports.boardView = (req, res) => {
    User.findOne({
        where : {id : req.params.id},
        include : [{model : Post}]
    }).then((e) => {
        e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
        // * 화살표 함수는 {} 가 빠지면 바로 반환 (i.dataValues == {return i.dataValues})
    
        const Posts = e.dataValues;
        res.render('board', {data : Posts});    
    });
}

exports.boardUpdate = async (req, res) => {
    const {acc_decoded} = req;
    const {msg} = req.body;
    const {id} = req.params;

    // update() == UPDATE SET
    // update(수정 할 값을 객체로, 조건을 객체로)
    await Post.update({msg}, {where : {id}});
    res.redirect(`/board/view/${acc_decoded.id}`);
}

exports.boardDelete = async (req, res) => {
    await Post.destroy({
        where : {id : req.params.id}
    });
    res.redirect('/board');
}