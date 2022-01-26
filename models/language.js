
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    locale: String,
    img: String,
    data: {type: Array, default: []}
})
module.exports = mongoose.model('language', languageSchema);
    