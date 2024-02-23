var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema({
    Brand: {type: String, required: true, maxlength: 100},
    Model: {type: String, required: true, maxlength: 100},
    Color: {type: String, required: true, maxlength: 100},
    year: {type: String, required: true, maxlength: 4}
});

module.exports = mongoose.model('Car', CarSchema);