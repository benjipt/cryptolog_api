const express = require('express');
const transactions = express.Router();

const Transaction = require('../models/transactions');

transactions.get('/', (req, res) => {
    Transaction.find({}, (err, foundTransactions) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundTransactions);
    })
});


// === CREATE ROUTE ===
/*
***** NOTE: this works with transaction Schema set to only require a string for coin, all other requireds are turned off *****
curl -X POST -H "Content-Type: application/json" -d '{"coin" : "another fake coin" }' 'http://localhost:3003/transactions'
*/
transactions.post('/', (req, res) => {
    Transaction.create(req.body, (err, createdTransaction) => {
        if (err) {
            // Tell the user something went wrong
            // status code 400 === something broke
            // json === include a body with the message from the db
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(createdTransaction);
    })
});


// === UPDATE ROUTE ===
// curl -X PUT -H "Content-Type: application/json" -d '{"exchange" : "this is an update!!!!!!"}' 'http://localhost:3003/transactions/60c7bf84a1ac469a79d1d4f7'
transactions.put('/:id', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTransaction) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(updatedTransaction);
    })
});

// === DELETE ROUTE ===
// curl -X DELETE 'http://localhost:3003/transactions/60c7bf84a1ac469a79d1d4f7'
transactions.delete('/:id', (req, res) => {
    Transaction.findByIdAndRemove(req.params.id, (err, deletedTransaction) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json({
            'deleted_transaction': deletedTransaction
        });
    })
})

module.exports = transactions;