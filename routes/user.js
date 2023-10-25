const express = require('express');
const {signup, logIn, logOut} = require('../controllers/authController')
const router = express.Router();

router.post('/signup', signup);
router.post('/login', logIn);
router.post('/logout', logOut);
module.exports = router;