const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const cars = [
    {id: 1, make: "Toyato", model: "Canry", year: 2022}
]

app.get('/', (req, res) => {

    res.send("Hello, Express!")
})

app.post('/cars', (req, res) => {

    const newCar = req.body
    if(!newCar.make || !newCar.model || !newCar.year){
        res.status(404).json({error : "Make, model and year are required."})
    }else{
        cars.push(newCar)
        res.status(201).json({message: "Car added successfully.", car: newCar})
    }

})

app.get('/cars', (req, res) => {
    
    res.send(cars)
})

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})