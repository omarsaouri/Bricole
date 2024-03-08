const supabase = require('../../models/supabase');

const newRequest = async (req, res) => {
  const {
    userId,
    description,
    price,
    city,
    dueDate,
    difficulty,
    privatePhoneNumber,
  } = req.body;

  try {
    const request = {
      user_id: userId,
      description: description,
      price: price,
      city: city,
      dueDate: dueDate,
      difficulty: difficulty,
      private_phoneNumber: privatePhoneNumber,
    };

    const {data: insertedRequest, error} = await supabase
      .from('requests')
      .insert([request])
      .select('*');

    if (error) {
      console.error('Error inserting request:', error);
      return res.status(500).json({error: 'Internal server error'});
    }

    res.status(201).json(insertedRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

module.exports = newRequest;
