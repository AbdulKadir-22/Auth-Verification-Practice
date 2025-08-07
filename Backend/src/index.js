const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json());
const userAuthRoute = require('./routes/userauth.route');

app.use('/api/user',userAuthRoute);

app.use(cors());
// app.use(express.json());



module.exports = app;