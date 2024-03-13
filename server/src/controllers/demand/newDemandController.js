const supabase = require('../../models/supabase');

const newDemand = async (req, res) => {
  const {requestId, userId, granted, state} = req.body;
  try {
    // Check if the demand already exists
    const {data: existingDemands, error: selectError} = await supabase
      .from('demands')
      .select('*')
      .eq('request_id', requestId)
      .eq('user_id', userId);

    if (selectError) {
      console.error('Error checking existing demand:', selectError.message);
      return res.status(400).json(selectError);
    }

    if (existingDemands.length > 0) {
      // Demand already exists, return a message or status code
      return res.status(400).json({error: 'You already sent a demand !'});
    }

    const newDemand = {
      request_id: requestId,
      user_id: userId,
      granted: granted,
      state: state,
    };

    const {data: insertedDemand, error: insertError} = await supabase
      .from('demands')
      .insert([newDemand])
      .select('*');

    if (insertError) {
      console.error('Error inserting demand:', insertError.message);
      return res.status(400).json(insertError);
    }

    res.json(insertedDemand);
  } catch (error) {
    console.error('Error creating Demand:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

module.exports = newDemand;
