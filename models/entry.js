
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    entry: [
    {
    	img: String,
    	bought_price: Number,
    	title: String,
    	quantity: Number,
    	addDate: {type: Date, default: new Date()},
    }]
})
module.exports = mongoose.model('entry', entrySchema);
    