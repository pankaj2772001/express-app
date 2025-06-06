const express = require('express')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT

app.get('/', (req, res) => {

    res.send("Hello from express server")
})

app.get('/signin', (req, res) => {

    res.send("This is the Sign Page")
})

app.get('/booking', (req, res) => {

    res.send('Book your tickets here')
})

app.get('/clothing/kids', (req, res) => {

    res.send('This is the kids wear page')
})

app.get('/blog', (req, res) => {

    res.send('This is blog page')
})

app.listen(PORT, () => {

    console.log("Server is running on port", PORT)
})










