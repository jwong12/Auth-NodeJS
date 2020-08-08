const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseNo : String,
    title : String,
    description : String,
    createdOn : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Course', courseSchema);