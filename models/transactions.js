const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    coin: { type: String, required: true },
    quantity: { type: mongoose.Decimal128, required: true },
    perUnitPrice: { type: mongoose.Decimal128, required: true },
    exchange: { type: String, required: true },
    transactionDate: { type: Date, required: true },
    transactionType: { type: String, required: true },
}, { timestamps: true });

const Transaction = mongoose.model('Transactions', transactionSchema);

module.exports = Transaction;
