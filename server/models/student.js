const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: Number,
    email: String,
    password: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;