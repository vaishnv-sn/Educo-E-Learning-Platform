const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;