const router = require("express").Router();
const {Signup} = require("../controllers/signupCon");

router.get('/', (req, res) => {
    res.render("signup");
});

router.post('/', Signup);

module.exports = router;