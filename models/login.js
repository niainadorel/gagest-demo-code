
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user' },
    email: String,
    password: String
})
module.exports = mongoose.model('login', loginSchema);
    