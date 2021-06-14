const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const APP = express();
const PORT = 3003;

// MIDDLEWARE
APP.use(express.json());

mongoose.connect('mongodb://localhost:27017/cryptolog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo :)');
});

// configure my cors middleware for other requests
// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

// APP.use(cors(corsOptions))

const transactionsController = require('./controllers/transactions');
APP.use('/transactions', transactionsController);

// APP.get('/', (req, res) => {
//     res.send('connected');
// });

APP.listen(PORT, () => {
    console.log(`Server is now listening at port: ${PORT}`);
});