// DEPENDENCIES
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const APP = express();
const session = require('express-session');
require('dotenv').config();


//Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
const MONGODBNAME = process.env.MONGODBNAME;

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/cryptolog`;

// Connect to Mongo
mongoose.connect( MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open', () => {
    console.log('connected to mongo :)');
});

// MIDDLEWARE
APP.use(express.json());

// SESSIONS
APP.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
    })
)

// / !!!! CORS SECTION COMMENTED OUT TO RUN CURL COMMANDS !!!!!
// configure my cors middleware for other requests
const whitelist = ['http://localhost:3000', 'http://localhost:3000/users', 'https://cryptolog-frontend.herokuapp.com' , 'https://cryptolog-frontend.herokuapp.com/' ]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

APP.use(cors(corsOptions));

// CONTROLLERS
const transactionsController = require('./controllers/transactions');
APP.use('/transactions', transactionsController);

const sessionsController = require('./controllers/sessions');
APP.use('/sessions', sessionsController);

const usersController = require('./controllers/users');
APP.use('/users', usersController);

APP.listen(PORT, () => {
    console.log(`Server is now listening at port: ${PORT}`);
});