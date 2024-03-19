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
      return res.status(400).json({error: 'You already sent a demand !'});
    }
    // check if the request has non private number
    const {data: request, error: requestError} = await supabase
      .from('requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (requestError) {
      console.error('Error checking request:', requestError.message);
      return res.status(400).json(requestError);
    }

    if (request.private_phoneNumber === false) {
      const {data: userPhoneNumber, error: userError} = await supabase
        .from('users')
        .select('phoneNumber')
        .eq('id', request.user_id)
        .single();

      if (userError) {
        console.error('Error checking user:', userError.message);
        return res.status(400).json(userError);
      }
      return res.json(userPhoneNumber);
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
