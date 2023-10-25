const express = require('express')
const router = express.Router();
const {getIndex} = require('../controllers/viewController')


router.get('/', getIndex)
module.exports = router