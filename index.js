const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000



app.get('/', (req, res) => {

    res.send("Hello Express!")

});



app.get('/about', (req, res) => {

    res.send("This is the About Page")
})

app.get('/contact', (req, res) => {

    res.send("This is the Contact Us Page")
})



app.listen(PORT, () => {

    console.log("Server is running on port", PORT)
})