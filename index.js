const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const app = express();
const port = 3005;

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.vryvacv.mongodb.net/Cars-API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB...');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Could not connect to MongoDB...'));

function validateCar(car)
{
  const schema = Joi.object({
    brand: Joi.string().min(3).required(),
    model: Joi.string().min(3).required(),
    year: Joi.number().min(4).required()
  });
  return schema.validate(car);
}

const cars = [
  { id: 1, brand: 'BMW', model: 'M4', year: 2019 },
  { id: 2, brand: 'Audi', model: 'A5', year: 2020 },
  { id: 3, brand: 'Ford', model: 'Focus', year: 2021 },
];

app.get('/' , (req, res) => {
  res.send('Welcome to the homepage');
  });

app.get('/cars' , (req, res) => {
  res.send(cars);
  });
app.get('/cars/:id' , (req, res) => {
  const car = cars.find(cars => cars.id === parseInt(req.params.id));
  if (!car) return res.status(404).send('The car with the given ID was not found');
  res.send(car);
  });

app.post('/cars' , (req, res) => {
  
  const { error } = validateCar(req.body);
  if(error)
    return res.status(400).send(error.details[0].message);
  const car = {
    id: cars.length+1,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year
  };
  cars.push(car);
  res.send(car);
  });

  app.put('/cars/:id' , (req, res) => {
    const car = cars.find(cars => cars.id === parseInt(req.params.id));
    if (!car)  return res.status(404).send('The car with the given ID was not found');
    const schema = Joi.object({
      brand: Joi.string().min(3).required(),
      model: Joi.string().min(3).required(),
      year: Joi.number().min(4).required()
    });
    const result = schema.validate(req.body);
    if(result.error)
      return res.status(400).send(result.error.details[0].message);
    car.brand = req.body.brand;
    car.model = req.body.model;
    car.year = req.body.year;
    res.send(car);
    });

    app.delete('/cars/:id' , (req, res) => {
      const car = cars.find(cars => cars.id === parseInt(req.params.id));
      if (!car) return res.status(404).send('The car with the given ID was not found');
      const index = cars.indexOf(car);
      cars.splice(index, 1);
      res.send(car);
      });