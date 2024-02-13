const supabase = require('../../models/supabase');

const getRequests = async (req, res) => {
  try {
    const {difficulty, city} = req.query;

    let filteredRequests;

    if (!difficulty && !city) {
      const {data, error} = await supabase.from('requests').select('*');

      if (error) {
        throw error;
      }

      res.json(data);
    } else {
      const {data, error} = await supabase
        .from('requests')
        .select('*')
        .eq('difficulty', difficulty)
        .eq('city', city)
        .order('created_at', {ascending: false});

      if (error) {
        throw error;
      }

      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getRequests;
