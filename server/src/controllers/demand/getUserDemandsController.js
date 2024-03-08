const supabase = require('../../models/supabase');

const getUserDemands = async (req, res) => {
  const userId = req.params.userId;

  try {
    const {data: demands, error} = await supabase
      .from('demands')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    if (!demands || demands.length === 0) {
      return res
        .status(404)
        .json({error: 'No demands found for the specified request ID'});
    }

    res.json(demands);
  } catch (error) {
    console.error('Error fetching demands:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

module.exports = getUserDemands;
