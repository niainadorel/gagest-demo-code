
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sortieSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    sorties: [
    	{
    		products: Array,
    		client: Object,
    		addDate: {type: Date, default: new Date()},
            remise: Number,
            tva: Number,
            totalPrice: Number,
    	}
    ] 

 })
module.exports = mongoose.model('sortie', sortieSchema);
    