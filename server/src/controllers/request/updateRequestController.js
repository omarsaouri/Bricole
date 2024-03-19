const supabase = require('../../models/supabase');

const updateRequest = async (req, res) => {
  const requestId = req.params.id;
  const {key, value} = req.body;

  try {
    const {data: existingRequest, error: fetchError} = await supabase
      .from('requests')
      .update({[key]: value})
      .eq('id', requestId)
      .select('*');

    if (fetchError) {
      throw fetchError;
    }

    if (!existingRequest) {
      return res.status(404).send('Request not found');
    }

    return res.status(200).json(existingRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    return res
      .status(500)
      .json({error: 'Internal Server Error', message: error.message});
  }
};

module.exports = updateRequest;
