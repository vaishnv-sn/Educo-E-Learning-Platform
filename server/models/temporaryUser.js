const mongoose = require('mongoose');

const temporaryUserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: Number, required: true, },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, expires: '5m', default: Date.now }, // Temp record auto-deletes after 5 minutes
});

const TemporaryUser = mongoose.model('TemporaryUser', temporaryUserSchema);

module.exports = TemporaryUser;