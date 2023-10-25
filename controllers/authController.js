const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const signToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_IN})

exports.signup = async (req, res) => {
    try {
        const users = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });
        const token = signToken(users._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("json-web-token", token, cookieOptions)
        res.status(201).json({
            status: "success",
            token,
            data: {
                users
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}
// Login The User
exports.logIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const users = await User.findOne({email});

        /* 1) Check if there is no User Email & Password */
        if (!email || !password) return next(
            res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            })
        )
        /* 2) Check if there is no user exit in DB */
        if (!users) return next(
            res.status(400).json({
                status: "fail",
                message: "No user found"
            })
        );
        const token = signToken(users._id)
        res.status(201).json({
            status: "success",
            token,
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

exports.logOut = (req, res) => {
    try {
        console.log(res.cookie);
        res.clearCookie("json-web-token", {path: '/'});
        res.status(201).json({
            status: "success",
            message: 'Logged out successfully !'
        });
    } catch (e) {
        res.status(500).json({
            status: "fail",
            message: "Failed to logged out"

        })
    }
}
