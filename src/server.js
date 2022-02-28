const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");

const app = express();
app.use(express.json());
app.use("/user",userController);

app.listen(8000,async() => {
    await connect();
    console.log("Listening to port 8000");
})