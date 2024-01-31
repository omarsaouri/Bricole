const {comparePassword} = require('../../helpers/hash');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const {phoneNumber, password} = req.body;

  try {
    const foundUser = await User.findOne({phoneNumber});
    if (!foundUser) return res.status(400).json('Wrong phone number');
    const match = await comparePassword(password, foundUser.password);
    if (!match) return res.status(400).json('Wrong password');
    const userPayload = {
      id: foundUser.phoneNumber,
    };
    const access_token = jwt.sign(userPayload, process.env.JWT_SECRET);
    res.status(201).json({user: foundUser, access_token: access_token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = loginUser;
