const Request = require('../../models/request');

const getRequests = async (req, res) => {
  try {
    const {idealDifficulty, city} = req.query;

    // idealDifficulty nor city are provided
    if (!idealDifficulty && !city) {
      const allRequests = await Request.find();
      return res.json(allRequests);
    }

    // idealDifficulty is provided
    if (idealDifficulty && !city) {
      const noCityFilterRequests = await Request.find({
        difficulty: idealDifficulty,
      });
      return res.json(noCityFilterRequests);
    }

    // city is provided
    if (city && !idealDifficulty) {
      const noDifficultyFilterRequests = await Request.find({
        city: city,
      });
      return res.json(noDifficultyFilterRequests);
    }

    // both idealDifficulty and city are provided
    if (city && idealDifficulty) {
      const filteredRequests = await Request.find({
        difficulty: idealDifficulty,
        city: city,
      });
      return res.json(filteredRequests);
    }
  } catch (error) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getRequests;
