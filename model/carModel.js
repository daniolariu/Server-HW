const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: { type: String, required: [true, "Please enter a brand name."], minlength: 3 },
    model: { type: String, required: [true, "Please enter a model."], minlength: 3 },
    year: { type: Number, required: [true, "Please enter a year."], min: 4 }
    });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;