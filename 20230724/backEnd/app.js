const express = require("express");
const cors = reuiqre("cors");
const session = require("express-session");
const dot = require("dotenv").config();
const {sequelize} = require("./models")




const app = express();




app.listen(8080, () => {
    console.log("server open")
});