const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const dot = require("dotenv").config();
const {sequelize} = require("./models");

const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const profileRouter = require("./routers/profileRouter");

const app = express();

app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true
}));

app.use(express.urlencoded({extended : false}));

app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}));

app.use("/img", express.static(path.join(__dirname, "profiles")));

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);

sequelize.sync({
    force : false
});

app.listen(9021, () => {
    console.log("server opened");
});