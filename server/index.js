const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const supabase = require('./src/models/supabase');

const authRouter = require('./src/routes/auth/authRoutes');
const requestRouter = require('./src/routes/request/requestRoutes');
const demandRouter = require('./src/routes/demand/demandRoutes');
const userRouter = require('./src/routes/user/userRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use('/auth', authRouter);
app.use('/requests', requestRouter);
app.use('/demands', demandRouter);
app.use('/user', userRouter);

//server connection
app.listen(port, () => console.log(`App listening on port ${port}!`));
