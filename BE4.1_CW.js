const {initializeData} = require('./db/db.connect')

initializeData()

const express = require('express')

const app = express()

app.use(express.json())

const Movie = require('./models/movies.model')

//read movie by title

async function readMovieByTitle(movieTitle) {

    try {

        const movie = await Movie.findOne({title: movieTitle})
        return movie

        
    } catch (error) {

        throw error
        
    }
    
}

// readMovieByTitle("Bahubali: The Beginning")

app.get('/movies/:title', async (req, res) => {

    try {

        const movie = await readMovieByTitle(req.params.title)


        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(404).json({error: "Movie not found"})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch movie."})
        
    }
})

//get all movies

async function getAllMovies(){

    try {

        const movie = await Movie.find()

        return(movie)
        
    } catch (error) {

        console.log("Failed to find movie", error)
        
    }
}

// getAllMovies()

app.get('/movies', async (req, res) => {

    try {

        const movie = await getAllMovies()

        if(movie.length != 0){

            res.json(movie)
        }else{

            res.status(404).json({error: "Movie not found"})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch data"})
        
    }
})


// movie by director name

async function getMovieByDirector(directorName){

    try {

        const movie = await Movie.find({director: directorName})

        return(movie)
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch movie"})
        
    }
}

// getMovieByDirector("Aditya Chopra")

app.get("/movies/director/:directorName", async (req, res) => {

    try {

        const movie = await getMovieByDirector(req.params.directorName)
        
        if(movie.length != 0){

            res.status(200).json(movie)
        }else{
            res.status(404).json({error: "Movie not found"})
        }
    } catch (error) {

        res.status(500).json({error: "Failed to fetch movies"})
        
    }
})


// read movie by genre

async function readMovieByGenre(movieGenre){

    try {

        const movieByGenre = await Movie.find({genre: movieGenre})

        return movieByGenre
        
    } catch (error) {

        console.log("Failed to find movies", error)
        
    }
}

// readMovieByGenre()

app.get('/movies/genre/:genreName', async(req, res) => {

    try {

        const movie = await readMovieByGenre(req.params.genreName)

        if(movie.length != 0){

            res.status(200).json(movie)
        }else{
            res.status(404).json({error: "Movie not found"})
        }
        
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movies."})
    }
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})

