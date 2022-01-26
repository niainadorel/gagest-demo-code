
const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user' },
    title: String,
    img: String,
    description: String,
    sell_price: Number,
    bought_price: Number, // prix d'achat
    big_quantity_price: Number, // prix de gros
    minimum_sell_price: Number,
    quantity: Number,
    addDate: {type: Date, default: new Date()},
    lastUpdate: {type: Date, default: new Date()},
    unit: String,
    category: String,
    lastCheck: {type: Date, default: new Date()},
    stockDAlert: {type: Number, default: 0},
    stockMinimum: {type: Number, default: 0},
    stockMaxmum: Number,
    barcode: {
        type: String,
        default: shortid.generate
    },
    changementCause: String,
    modifier: String,
    reference: String,
    fournisseur: String
})
module.exports = mongoose.model('product', productSchema);
    