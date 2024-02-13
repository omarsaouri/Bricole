const supabase = require('../../models/supabase');

const newDemand = async (req, res) => {
  const {requestId, userId, granted, state} = req.body;
  try {
    const newDemand = {
      request_id: requestId,
      user_id: userId,
      granted: granted,
      state: state,
    };

    const {data: insertedDemand, error} = await supabase
      .from('demands')
      .insert([newDemand])
      .select('*');

    if (error) {
      return res.status(400).json(error);
    }

    res.json(insertedDemand);
  } catch (error) {
    console.error('Error creating Demand:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

module.exports = newDemand;
