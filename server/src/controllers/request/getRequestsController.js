const supabase = require('../../models/supabase');

const getRequests = async (req, res) => {
  try {
    let query = supabase.from('requests').select('*');

    const {city, difficulty} = req.query;

    if (city && difficulty) {
      query = query.eq('city', city).eq('difficulty', difficulty);
    } else if (city) {
      query = query.eq('city', city);
    } else if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const {data: allRequests, error: fetchReq} = await query;

    if (fetchReq) {
      throw fetchReq;
    }

    const {data: demandIds, error: fetchDe} = await supabase
      .from('demands')
      .select('request_id')
      .eq('state', 'accepted');

    if (fetchDe) {
      throw fetchDe;
    }
    const demandIdArray = demandIds.map(demand => demand.request_id);

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
