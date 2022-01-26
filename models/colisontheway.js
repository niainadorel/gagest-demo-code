
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colisonthewaySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    sens: String,
    addDate: {type : Date, default: new Date()},
    supposedArrivalDate: {type: Date},
    localisation: String,
    img: String,
    bought_price: Number,
    title: String,
    quantity: Number,
    done: {type: Boolean, default: false},
    product: String
})
module.exports = mongoose.model('colisontheway', colisonthewaySchema);
    