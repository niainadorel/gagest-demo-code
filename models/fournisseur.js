
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fournisseurSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    name: String
})
module.exports = mongoose.model('fournisseur', fournisseurSchema);
    