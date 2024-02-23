const db = require('./dbconfig');

const getAllMovies = (req, res) => {
    db.query('select * from movies', (error, result) => {
        if(error){
            console.log(error);
        }
        else{
            res.json(result.rows);
        }
    });
};

const getMovieById = (req, res) => {
    const query = {
        text: 'select * from movies where id = $1',
        values: [req.params.id],
    }

    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
        else{
            if(result.rows.length > 0){
                res.json(result.rows);
            }
            else{
                res.status(404).end();
            }
        }
    })
};

const addMovie = (req, res) => {
    const newMovie = req.body;

    const query = {
        text: 'insert into movies (title, director, year) values ($1, $2, $3)',
        values: [newMovie.title, newMovie.director, newMovie.year],
    }

    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
    res.json(newMovie);
}

const deleteMovie = (req, res) => {
    const query = {
        text: 'delete from movies where id = $1',
        values: [req.params.id],
    }

    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
    res.status(204).end();
}

const updateMovie = (req, res) => {
    const editedMovie = req.body;

    const query = {
        text: 'update movies set title=$1, director=$2, year=$3 where id = $4',
        values: [editedMovie.title, editedMovie.director, editedMovie.year, req.params.id],
    }

    db.query(query, (error, result) => {
        if(error){
            return console.error('Error executing query', error.stack);
        }
    });
    res.json(editedMovie);
}

// Poista kaikki elokuvat
const deleteAllMovies = () => {
    db.query('DELETE FROM movies', (err, res) => {
      if (err) {
        return console.error('Error executing query', err.stack)
      }
    })
  }

module.exports = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    updateMovie: updateMovie,
    deleteAllMovies: deleteAllMovies
}