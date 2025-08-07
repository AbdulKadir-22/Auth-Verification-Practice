const User = require('../model/userauth.model')

const loginUser = async (req, res) => {
  res.json({ message: `Login User` });
};

const signupUser = async (req, res) => {
  res.json({ message: `Signup User` });
};

module.exports = { loginUser, signupUser };
