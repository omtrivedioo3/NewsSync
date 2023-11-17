const model = require("../mongo/user");
const model2 = require("../mongo/chnagePassword")
const User = model.User;
const Otp = model2.Otp
const express = require("express");
const Router = require("router");
const { mongo } = require("mongoose");
const router = Router();
var nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");



let newuser = {}
let user;
// User login request
router.post("/login", async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    user = await User.findOne({ email: email });
    console.log(user)
    // console.log(email)
    // console.log(password)

    // if (!email || !password) {
    //     success = false;
    //     res.send({ message: "Please enter valid data" });
    // } else {
    if (user) {
        newuser.email = email;
        const hashPassword = await bcrypt.compare(password, user.password);
        if (hashPassword) {
            res.send({ message: "Login Successfull", user: user });
        } else {
            success = false;
            res.send({
                message: "Password didn't match",
            });
            // res.sendStatus(401);
        }
    } else {
        success = false;
        res.send({ message: "User not registered" });
    }
    // }
});
// User register request
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    let success = false;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            success = false;
            res.send({
                message: "User already registerd",
                user: user,
                success: success,
            });
        } else {
            const user = new User({
                name,
                email,
                password,
            });
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            const doc = await user.save();
            console.log(doc);
            success = true;
            res.json({
                message: "User registered Successfull, Please Login now...",
                success: success,
            });
        }
    } catch (err) {
        success = false;
        res.send(err);
    }
});

// User register request
router.post("/email-send", async (req, res) => {
    const { email } = req.body;
    const responseType = {};
    try {

        let user = await User.findOne({ email: email });
        // console.log(user + "  email");
        if (user) {
            let otpcode = Math.floor((Math.random() * 10000) + 1);
            let otpData = new Otp({
                email: user.email,
                code: otpcode,
                expireIn: new Date().getTime() + 300 * 1000
            })
            let optResponse = await otpData.save();
            responseType.statusText = 'Success';
            mailer(user, otpData.code);
            responseType.message = 'Please check your Email Id';
        }
        else {
            responseType.statusText = 'error';
            responseType.message = 'Email Id not Exist';
        }
    }
    catch (err) {
        // console.log('error', err);
        res.send(err);
    }
    res.status(200).json(responseType);
});

router.post("/change-password", async (req, res) => {
    const { code, email, password, cpassword } = req.body;
    const response = {}
    try {
        let data = await Otp.find({ code: code });
        console.log("om ttt");
        // try {
        //     console.log(data[0].code);
        // }
        // catch (error) {
        //     console.log("ommom")
        //     res.send(error)

        // }
        console.log("ommom")
        console.log(data.length)
        console.log(data)


        if (data.length >= 1) {
            let currentTime = new Date().getTime();
            let diff = data.expireIn - currentTime;
            if (diff < 0) {
                response.message = 'Token Expire'
                response.statusText = 'error'
            }
            else {
            // console.log(req.body.email);
            let user = await User.findOne({ email: req.body.email })
            // console.log(user);
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashPassword;
            // user.password = req.body.password;
            const doc = await user.save();
            response.message = 'Password changed Successfully'
            response.statusText = 'Success';
            }
        }
        else {
            response.message = 'Invalid Otp'
            response.statusText = 'error'
        }
    } catch (err) {
        res.send(err);
    }
    res.status(200).json(response);
});

const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: 'trivediom00777@gmail.com',
            pass: 'tukpmytyevmrmwua'
        }
    });
    var mailOptions = {
        from: 'trivediom00777@gmail.com',
        to: 'omtrivedioo3@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'Thank you sir !'

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error");
        } else {
            console.log('Email sent: + info.response');
        }
        exports.router = router;
    })
};

exports.router = router;