const supabase = require('../../models/supabase');

const getRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    const {data: request, error} = await supabase
      .from('requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (error) {
      throw error;
    }

    if (!request) {
      return res.status(404).send('Request not found');
    }

    return res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getRequest;
