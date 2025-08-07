const express = require('express');
const router = express.Router();

const { loginUser, signupUser } = require('../controller/userauth.controller');

router.post('/login', loginUser);
router.post('/signup', signupUser);


module.exports =  router;