
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    client: { type: Schema.Types.ObjectId, ref: 'client' },
    products: Object,
    totalPrice: Number,
    status: {type: String, default: 'pending'},
    tva: {type: Number, default: 0},
    remise: {type: Number, default: 0},
    addDate: {type: Date, default: new Date()},
    sortieCreated: {type: Boolean, default: false}
})
module.exports = mongoose.model('commande', commandeSchema);
    