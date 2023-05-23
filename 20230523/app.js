const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const path = require("path");

const {sequelize} = require("./models");

const mainRouter = require("./routers/mainRouter");
const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const boardRouter = require("./routers/boardRouter");
const adminRouter = require("./routers/adminRouter");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended : false}));

app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}));

sequelize.sync({force : false}).then((e) => {
    console.log("연결 성공")
}).catch((err) => {
    console.log(err);
});

app.use("/", mainRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/board", boardRouter);
app.use("/admin", adminRouter);


app.listen(9014, () => {
    console.log("server opened");
});