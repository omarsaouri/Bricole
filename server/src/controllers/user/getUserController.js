const supabase = require('../../models/supabase');

const getUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const {data: user, error} = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getUser;
