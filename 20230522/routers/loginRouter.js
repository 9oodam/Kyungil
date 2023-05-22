const router = require("express").Router();
const {login} = require("../controllers/loginController");

router.get('/', (req, res) => {
    res.render("login");
});

router.post('/', login);

module.exports = router;