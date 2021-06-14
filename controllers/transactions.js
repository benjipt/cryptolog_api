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

transactions.put('/:id', (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTransaction) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.status(200).json(updatedTransaction);
    })
});

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