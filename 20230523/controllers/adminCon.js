const {User} = require("../models");
const {gradeCheck} = require("../middleware/gradeMid");

exports.adminView = async (req, res) => {
    try {
        const users = await User.findAll();
        res.render("admin", {data : users});
    } catch (error) {
        console.log(error);
    }
}

exports.gradeUpgrade = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where : {id}});
        const grade = user.grade;
        console.log(user);
        console.log(grade);
        console.log(id);

        await User.update({grade : grade+1}, {where : {id}});
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

exports.gradeDowngrade = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where : {id}});
        const grade = user.grade;

        await User.update({grade : grade-1}, {where : {id}});
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

