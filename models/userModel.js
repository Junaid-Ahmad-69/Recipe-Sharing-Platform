const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please tell us your name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email!'],
        lower: true,
        validate: [validator.isEmail, "Provide a valid email address"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        maxLength: [10, "A UserModel must have less or equal 10 characters"],
        minLength: [6, "A UserModel must have less or equal 6 characters"],
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: 'Password are not the same'
        }
    },
})

/*Bcrypt the password and remove the confirm password before dave to db using middleware*/

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    // delete or hide the confirm-password from db
    this.confirmPassword = undefined;
})


const user = mongoose.model('user', userSchema);
module.exports = user;



