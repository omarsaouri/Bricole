const Request = require('../../models/request');

const getRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);
    if (!request) return res.status(404).send('Request not found');
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = getRequest;
