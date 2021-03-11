var mongoose = require('mongoose');

var Contact = module.exports = mongoose.model('contact', mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
}));

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}