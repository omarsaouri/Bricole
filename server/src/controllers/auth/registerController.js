const {hashPassword} = require('../../helpers/hash');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const {firstName, lastName, phoneNumber, password} = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    };
    await User.create(user);
    const userPayload = {
      id: user.phoneNumber,
    };
    const access_token = jwt.sign(userPayload, process.env.JWT_SECRET);
    res.status(201).json({user: user, access_token: access_token});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = registerUser;
