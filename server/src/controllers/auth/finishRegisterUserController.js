const supabase = require('../../models/supabase');

const finishRegisterUser = async (req, res) => {
  const {userId, idealDifficulty, city} = req.body;

  try {
    // Construct the update object with the fields to be updated
    const updateObject = {
      idealDifficulty: idealDifficulty,
      city: city,
    };

    // Update the user in the database
    const {data: updatedUser, error: updateError} = await supabase
      .from('users')
      .update(updateObject)
      .eq('id', userId)
      .select('*');

    if (updateError) {
      throw updateError;
    }

    res.status(201).json({user: updatedUser});
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).send('Internal server error');
  }
};

module.exports = finishRegisterUser;
