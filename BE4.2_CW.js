const {initializeData} = require('./db/db.connect')


require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.json())


const Movie = require('./models/movies.model')

const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})

initializeData()



async function createMovie(newMovie){

    try {

        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        return saveMovie
        
    } catch (error) {

        throw error
        
    }


}

// createMovie(newMovie)

app.post('/movies', async (req, res) => {

    try {

        const movie = await createMovie(req.body)

        res.status(201).json({message: "Movie added successfully", newMovie: movie})
        
    } catch (error) {

        res.status(500).json({error: "Failed to add movie."})
        
    }
    
    
})