const supabase = require('../../models/supabase');

const putState = async (req, res) => {
  const {demandId} = req.params;
  const {state} = req.body;

  try {
    const {data: existingDemand, error} = await supabase
      .from('demands')
      .select('*')
      .eq('id', demandId);

    if (error) throw error;

    if (!existingDemand || existingDemand.length === 0) {
      return res.status(404).json({error: 'No demand found!'});
    }

    const updatedDemand = await supabase
      .from('demands')
      .update({state: state})
      .eq('id', demandId)
      .select('*');

    return res
      .status(200)
      .json({message: 'Demand granted successfully!', updatedDemand});
  } catch (error) {
    return res.status(500).json({
      error: 'An error occurred while updating the demand.',
      details: error.message,
    });
  }
};

module.exports = putState;
