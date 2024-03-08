const {hashPassword} = require('../../helpers/hash');
const supabase = require('../../models/supabase');
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
    const {data: insertedUser, error} = await supabase
      .from('users')
      .insert([{...user}])
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    const userPayload = {
      id: phoneNumber,
    };
    const access_token = jwt.sign(userPayload, process.env.JWT_SECRET);

    res.status(201).json({user: insertedUser, access_token: access_token});
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).send('Internal server error');
  }
};

module.exports = registerUser;
