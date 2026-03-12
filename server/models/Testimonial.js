const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  role: { type: String, default: 'Client' }
}, { timestamps: true });
module.exports = mongoose.model('Testimonial', testimonialSchema);
