
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    type: String,
    seen: {type: Boolean, default: false},
    content: Object,
    addDate: {type: Date, default: new Date()}
})
module.exports = mongoose.model('notification', notificationSchema);
    