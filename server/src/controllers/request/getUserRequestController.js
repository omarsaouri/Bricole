const supabase = require('../../models/supabase');

const getUserRequests = async (req, res) => {
  const {user_id} = req.query;
  try {
    // Fetch all requests
    const {data: allRequests, error: fetchReq} = await supabase
      .from('requests')
      .select('*')
      .eq('user_id', user_id);

    if (fetchReq) {
      throw fetchReq;
    }

    res.json(allRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getUserRequests;
