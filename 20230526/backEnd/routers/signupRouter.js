const router = require("express").Router();
const {Signup} = require("../controllers/signupCon");

router.post('/', Signup);

module.exports = router;