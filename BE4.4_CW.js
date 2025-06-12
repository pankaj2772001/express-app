const {initializeData} = require('./db/db.connect')
initializeData()

const Movie = require('./models/movies.model')

const express = require('express')

const app = express()

app.use(express.json())


async function updateMovie(movieId, dataToUpdate){


    try {

        const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true})

        return updatedMovie
        
    } catch (error) {

        console.log("Error in updating Movie", error)
        
    }


}

//updateMovie("683975b6d5c2575c8cf3c3fb", {releaseYear: 2002})

app.post("/movies/:movieId", async (req, res) => {

    try {

        const updatedMovie = await updateMovie(req.params.movieId, req.body)

      

        if(updatedMovie){

            res.status(201).json({message: "Movie updated successfully.", movie: updatedMovie})

            
        }else{

            res.status(404).json({error: "Movie not found"})

            
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to update the movie"})
        
    }
})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`)
})