const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {

    res.send('Hello, This is Express Assignment Server.')
})

const albums = [

  { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },

  { id: 2, title: 'The Dark Side of the Moon', artist: 'Pink Floyd', year: 1973 },

  { id: 3, title: 'Thriller', artist: 'Michael Jackson', year: 1982 }

];

app.post('/albums', (req, res) => {

    const newAlbum = req.body

    if(!newAlbum.title || !newAlbum.artist || !newAlbum.year){

        res.status(404).json({error: "Title, Artist & Year is required."})
    }else{

        albums.push(newAlbum)
        res.status(200).json({message: "album added successfully.", album: newAlbum})
    }
})

app.get('/albums', (req, res) => {

    res.send(albums)
})

app.delete('/albums/:id', (req, res) => {

    const albumId = parseInt(req.params.id)

    const index = albums.findIndex(album => album.id === albumId)

    if(index === -1){

        res.status(404).json({error: "album not found."})

    }else{

        albums.splice(index, 1)
        res.status(200).json({message: "album deleted successfully."})
    }
})


app.post('/albums/:id', (req, res) => {

    const updatedAlbum = req.body

    const albumId = parseInt(req.params.id)

    const albumToUpdate = albums.find(album => album.id === albumId)

    if(!albumToUpdate){

        res.status(404).json({error: "Album does not exist."})
    }else{

        if(!updatedAlbum.title || !updatedAlbum.artist || !updatedAlbum.year){

            res.status(404).json({error: "Title, Artist & Year is required."})
        }else{

            Object.assign(albumToUpdate, updatedAlbum)

            res.status(200).json({message: "Album updated successfully.", album: updatedAlbum})
        }
    }


})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})