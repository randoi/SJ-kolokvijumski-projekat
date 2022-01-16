const express = require('express');
const { sequelize } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const usr = require('./routes/user_api');
const flt = require('./routes/flight_api');
const ec = require('./routes/economy_class_api');
const mc = require('./routes/middle_class_api');
const bc = require('./routes/business_class_api');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin',usr);
app.use('/admin',flt);
app.use('/admin',ec);
app.use('/admin',mc);
app.use('/admin',bc);

app.listen({ port: 7000 }, async () => {
    await sequelize.authenticate();
    console.log('REST Service Started');
});