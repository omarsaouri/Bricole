const Request = require('../../models/request');

const newRequest = async (req, res) => {
  const {description, price, city, adress, dueDate, difficulty, phoneNumber} =
    req.body;
  try {
    const request = {
      description: description,
      price: price,
      city: city,
      address: adress,
      dueDate: dueDate,
      difficulty: difficulty,
    };

    await Request.create(request);
    res.status(201).json(request);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = newRequest;
