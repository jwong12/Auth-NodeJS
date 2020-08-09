const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
    courseNo : String,
    title : String,
    description : String,
    createdOn : {type : Date, default : Date.now} 
})

const courses = new Schema({
    username: String,
    courses: [course]
});

module.exports = mongoose.model('Courses', courses);