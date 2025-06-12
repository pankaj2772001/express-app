const {initializeData} = require('./db/db.connect')
initializeData()

const Movie = require('./models/movies.model')

const express = require('express')

const app = express()

app.use(express.json())





async function deleteMovie(movieId){

    try {

        const deletedMovie = await Movie.findByIdAndDelete(movieId)

        return deletedMovie


        
    } catch (error) {

        console.log("Failed to delete movie", error)
        
    }
}

// deleteMovie('6848524bf1109e5e631789f0')


app.delete('/movies/:movieId', async (req, res) => {

    try {

        const deletedMovie = await deleteMovie(req.params.movieId)
        console.log(deletedMovie)
        if(!deletedMovie){
            res.status(404).json({error: "Movie not found"})
        }else{
            res.status(201).json({message: "Movie deleted successfully."})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to delete movie."})

        
    }
})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`)
})