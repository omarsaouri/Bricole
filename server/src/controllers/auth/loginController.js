const {comparePassword} = require('../../helpers/hash');
const jwt = require('jsonwebtoken');
const supabase = require('../../models/supabase');

const loginUser = async (req, res) => {
  const {phoneNumber, password} = req.body;

  try {
    const {data: foundUsers, error} = await supabase
      .from('users')
      .select('*')
      .eq('phoneNumber', phoneNumber);

    if (error) {
      throw error;
    }

    if (!foundUsers || foundUsers.length === 0) {
      return res.status(400).json('Wrong phone number');
    }

    if (foundUsers.length > 1) {
      return res
        .status(500)
        .json('Multiple users found for the same phone number');
    }

    const foundUser = foundUsers[0];

    const match = await comparePassword(password, foundUser.password);
    if (!match) {
      return res.status(400).json('Wrong password');
    }

    const userPayload = {
      id: foundUser.phoneNumber,
    };
    const access_token = jwt.sign(userPayload, process.env.JWT_SECRET);

    res.status(200).json({user: foundUser, access_token: access_token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = loginUser;

module.exports = loginUser;
