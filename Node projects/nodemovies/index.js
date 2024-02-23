const express = require('express');

const app = express();

app.use(express.json());

const port = 3000;

let movies = [
    {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
    {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
    {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
  ];

app.get("/api/movies", (request, response) => {
    response.json(movies);
});

app.get("/api/movies/:id", (request, response) => {
    const movieId = request.params.id;

    const movie = movies.filter(movie => movie.id === movieId);
    if(movie.length > 0){
        response.json(movie);
    }
    else{
        response.status(404).end();
    }
});

app.post("/api/movies", (request, response) => {
    const newMovie = {'id': Date.now().toString(), ...request.body};

    movies = [...movies, newMovie];
    response.json(newMovie);
});

app.put("/api/movies/:id", (request, response) => {
    const id = request.params.id;
    const updatedMovie = {'id': id, ...request.body};

    const index = movies.findIndex(movie => movie.id === id);
    movies.splice(index, 1, updatedMovie);

    response.json(updatedMovie);
});

app.delete("/api/movies/:id", (request, response) => {
    const id = request.params.id;

    movies = movies.filter(movie => movie.id !== id);
    response.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});