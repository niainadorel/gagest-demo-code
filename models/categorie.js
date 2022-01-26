
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    categories: {type: Array, default: []}
})
module.exports = mongoose.model('categorie', categorieSchema);
    