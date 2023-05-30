const express = require("express");
const path = require("path");
const cors = require("cors");

const signupRouter = require("./routers/signupRouter");
const loginRouter = require("./routers/loginRouter");
const profileRouter = require("./routers/profileRouter");

const app = express();

app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true
}));

app.use(express.urlencoded({extended : false}));

app.use("/img", express.static(path.join(__dirname, "profiles")));

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);

app.listen(9021, () => {
    console.log("server opened");
});