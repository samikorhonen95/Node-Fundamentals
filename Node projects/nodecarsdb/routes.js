const express = require('express');
const router = express.Router();
const Car = require('./models/car');

router.get("/cars", async (req, res) => {
    try{
        const cars = await Car.find();
        res.send(cars);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})

router.post("/cars", async (req, res) => {
    const car = new Car({
        Brand: req.body.Brand,
        Model: req.body.Model,
        Color: req.body.Color,
        year: req.body.year
    });
    try{
        const newCar = await car.save();
        res.status(201).json({newCar});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.delete("/cars", async (req, res) => {
    const response = await Car.deleteOne({_id: req.body._id})
        if(response.deletedCount === 0){
            res.status(404).json({message: "Car not found"});
        }
    return res.status(200).json({message: "Car deleted"});  
})

router.put("/cars/:id", async (req, res) => {
    const response = await Car.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    
    if(response === null){
        res.status(404).json({message: "Car not found"});
    }
    return res.status(200).json({message: "Car updated"});
});

module.exports = router;