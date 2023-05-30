const router = require("express").Router();
const {Login} = require("../controllers/userCon");

router.post('/', Login);

module.exports = router;