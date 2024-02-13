const supabase = require('../../models/supabase');

const deleteRequest = async (req, res) => {
  const {requestId} = req.body;

  try {
    const {data: existingRequest, error: fetchError} = await supabase
      .from('requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError) {
      return res.status(404).send('Request not found');
    }

    if (!existingRequest) {
      return res.status(404).send('Request not found');
    }

    const {data: deletedRequest, error: deletionError} = await supabase
      .from('requests')
      .delete()
      .eq('id', requestId)
      .single()
      .select('*');

    if (deletionError) {
      throw deletionError;
    }

    return res.status(200).json({
      message: 'Request deleted successfully',
      deletedRequest: deletedRequest,
    });
  } catch (error) {
    console.error('Error deleting request:', error);
    return res.status(500).send('Internal server error');
  }
};

module.exports = deleteRequest;
