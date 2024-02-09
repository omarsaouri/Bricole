const Request = require('../../models/request');

const updateRequest = async (req, res) => {
  const requestId = req.params.id;
  const {key, value} = req.body;

  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).send('Request not found');
    }
    request[key] = value;
    await request.save();

    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

module.exports = updateRequest;
