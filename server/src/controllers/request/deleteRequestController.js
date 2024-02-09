const Request = require('../../models/request');

const deleteRequest = async (req, res) => {
  const {requestId} = req.body;

  try {
    const deletedRequest = await Request.findOneAndDelete({_id: requestId});
    if (!deletedRequest) {
      return res.status(404).send('Request not found');
    }

    return res
      .status(200)
      .json({message: 'Request deleted successfully', deletedRequest});
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};

module.exports = deleteRequest;
