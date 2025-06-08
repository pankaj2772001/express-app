const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {

    res.send("Express server")
})

const movies = [

  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },

  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 }

];

app.post('/movies', (req, res) => {

    const newMovie = req.body

    if(!newMovie.title || !newMovie.director || !newMovie.year){

        res.status(404).json({error: "Title, Director & Year is required"})
    }else{
        movies.push(newMovie)
        res.status(200).json({message: "Movie added successfully.", movie: newMovie})
    }
})

app.get('/movies', (req, res) => {

    res.send(movies)
})

const items = [

  { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8},

 { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 }

];

app.post('/items', (req, res) => {

    const newItem = req.body

    if(!newItem.itemName || !newItem.color || !newItem.quantity){

        res.status(404).json({error: "Itemname, color & quantity is required"})
    }else{

        items.push(newItem)
        res.status(200).json({message: "Item added successfully", item: newItem})
    }

})

app.get('/items', (req, res) => {

    res.send(items)
})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on server ${PORT}`)
})


