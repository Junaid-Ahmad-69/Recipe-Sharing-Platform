const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {promisify} = require("util");
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
        res.cookie("jwt", token, cookieOptions)
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

        /* 1) Check if there is no User Email & Password */
        if (!email || !password) return next(
            res.status(400).json({
                status: "fail",
                message: "Please provide email and password"
            })
        )
        const user = await User.findOne({email}).select("+password");
        if (!user || !await user.correctPassword(password, user.password))
            return next(res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password'
                })
            )
        /* 2) Check if there is no user exit in DB */
        if (!user) return next(
            res.status(400).json({
                status: "fail",
                message: "No user found"
            })
        );
        const token = signToken(user._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_EXPIRE_COOKIES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("jwt", token, cookieOptions)
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
        res.clearCookie("jwt", {path: '/'});
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

/*Define Middleware if user has the token in bearer or not if it has token then he see the details of the recipes*/

exports.protect = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
            token = req.cookies.jwt
        }
        if (!token) return res.status(401).json({
            status: "fail",
            message: "You are not logged in Please logged in again !"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
    /* 2) Verified token from DB check if expire or not */
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
    /* 3) Check if user still exits mean they do not delete their account form DB */
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next(
        res.status(401).json({
            status: "fail",
            message: "User does not exist"
        })
    )
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
}
// Auth which is the current user
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)

        const loginUser = await User.findById(decoded.id)
        if (!loginUser) {
            return next()
        }
        // Use the locals method to use the current exited db user to use in pug files
        res.locals.user = loginUser;
        res.userId = loginUser;
        res.userPub = loginUser._id;

        return next();
    }
    next();
}