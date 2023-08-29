const mongoose = require('mongoose');

const temporaryUserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: Number,
  email: String,
  password: String,
  createdAt: { type: Date, expires: '5m', default: Date.now }, // Temp record auto-deletes after 5 minutes
});

const TemporaryUser = mongoose.model('TemporaryUser', temporaryUserSchema);

module.exports = TemporaryUser;