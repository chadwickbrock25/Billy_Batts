const mongoose = require('mongoose')

const merchSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  image:  { type: String, required: true },
  price: Number,
  quanity: Number,
  inStock: Boolean,
  description: String,
})

const Merch = mongoose.model('Merch', merchSchema)

module.exports = Merch