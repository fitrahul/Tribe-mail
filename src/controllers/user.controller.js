const express = require("express");
const route = express.Router();
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

var user;

route.post("", async (req, res) => {
    // 1. find the user
    user = await User.findOne({ email: req.body.email }).lean().exec();

    // 2. if user exist return a existing message
    if (user !== null) {
        return res.send({ message: "User already exist" });
    }

    // 3. otherwise trigger the mail as well as create the user
    else {
        // create a new user
        user = await User.create(req.body);

        // Nodemailer to trigger the mail
        var message = {
            from: "rahulee19@gmail.com",
            to: `${user.email}`,
            subject: "Signup",
            text: "Your account is successfully created",
            html: "<p>Your account is successfully created</p>"
        };

        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: "8c726e6ce5a8b2",
                pass: "727c6c418f4e94",
            },
        });

        transporter.sendMail(message);
        
        return res.status(201).send({ user });
    }
})

route.get("",async(req,res) => {
    user = await User.find().lean().exec();
    return res.send({user});
})

module.exports = route;
