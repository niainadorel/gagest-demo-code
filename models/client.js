
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    name: String,
    address: String,
    NIF: String,
    STAT: String,
    RCS: String,
    responsable: String,
    phoneNumber: String,
    email: String,
    website: String,
    img: String,
    status: {type: String, default: 'enabled'},
    connected: {type: Boolean, default: false},
    username: String,
    password: String
})
module.exports = mongoose.model('client', clientSchema);
    