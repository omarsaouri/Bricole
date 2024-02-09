const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const authRouter = require('./src/routes/auth/authRoutes');
const requestRouter = require('./src/routes/request/requestRoutes');

app.use(cors());
app.use(express.json());

//data base connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch(error => {
    console.log('Database connection failed', error);
  });

// routes
app.use('/auth', authRouter);
app.use('/requests', requestRouter);

//server connection
app.listen(port, () => console.log(`App listening on port ${port}!`));
