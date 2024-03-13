const supabase = require('../../models/supabase');

const getRequests = async (req, res) => {
  try {
    // Fetch all requests
    const {data: allRequests, error: fetchReq} = await supabase
      .from('requests')
      .select('*');

    if (fetchReq) {
      throw fetchReq;
    }

    // Fetch  demand IDs that are pending
    const {data: demandIds, error: fetchDe} = await supabase
      .from('demands')
      .select('request_id')
      .eq('state', 'pending');

    if (fetchDe) {
      throw fetchDe;
    }
    const demandIdArray = demandIds.map(demand => demand.request_id);

    // Filter out requests whose IDs are in the demandIdArray
    const filteredRequests = allRequests.filter(
      request => !demandIdArray.some(id => id === request.id),
    );

    res.json(filteredRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getRequests;
