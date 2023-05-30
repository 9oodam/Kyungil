const router = require("express").Router();
const {Signup} = require("../controllers/userCon");

router.post('/', Signup);

module.exports = router;