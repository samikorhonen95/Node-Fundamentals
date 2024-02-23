var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title: {type: String, required: true, maxlength: 100},
    director: {type: String, required: true, maxlength: 100},
    year: {type: String, required: true, maxlength: 4}
});

module.exports = mongoose.model('Movie', MovieSchema);