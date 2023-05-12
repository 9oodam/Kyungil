const express = require("express");
const router = express.Router();

router.get("/", (rea, res) => {
    res.render("login");
});

module.exports = router;