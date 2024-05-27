const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3005;
const Car = require('./model/carModel');

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.vryvacv.mongodb.net/Cars-API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB...');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Could not connect to MongoDB...'));


const cars = [
  { id: 1, brand: 'BMW', model: 'M4', year: 2019 },
  { id: 2, brand: 'Audi', model: 'A5', year: 2020 },
  { id: 3, brand: 'Ford', model: 'Focus', year: 2021 },
];

app.get('/' , (req, res) => {
  try {
    res.send('Welcome to the homepage');
  } catch (err) {
    res.status(500).send(err.message);
  }
  });

app.get('/cars' , async(req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).send(err.message);
  }});

app.get('/cars/:id' , async(req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    res.status(500).send(err.message);
  }
  });

app.post('/cars' , async(req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(200).json(car);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
  });

  app.put('/cars/:id' , async(req, res) => {
   try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body);
   if (!car) return res.status(404).send('The car with the given ID was not found');
   const updatedCar = await Car.findById(req.params.id);
   res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).send(err.message);
   }
    });

    app.delete('/cars/:id' , async(req, res) => {
      try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).send('The car with the given ID was not found');
        res.status(200).json(car);
      } catch (err) {
        res.status(500).send(err.message);
      }
      });