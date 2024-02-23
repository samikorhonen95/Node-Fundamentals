const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');

router.get("/movies", async (req, res) => {
    try{
        const movies = await Movie.find();
        res.send(movies);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.post("/movies", async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    });

    try{
        const newMovie = await movie.save();
        res.status(201).json({newMovie});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

router.delete("/movies", async (req, res) => {
    const response = await Movie.deleteOne({title: req.body.title})
        if(response.deletedCount === 0){
            return res.status(404).json({message: "Movie not found"});
        };
        return res.status(200).json({message: "Movie deleted"});
});

router.put("/movies/:id", async (req, res) => {
    const response = await Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});

    if(response === null){
        return res.status(404).json({message: "Movie not found"});
    }
    return res.status(200).json({message: "Movie updated"});
});

module.exports = router;