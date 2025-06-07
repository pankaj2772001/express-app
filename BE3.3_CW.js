const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

const cars = [
    { id: 1, make: "Toyota", model: "Camry", year: 2022 },
    { id: 2, make: "Honda", model: "Civic", year: 2021 },
    { id: 3, make: "Ford", model: "Mustang", year: 2023 },
    { id: 4, make: "Chevrolet", model: "Malibu", year: 2020 },
    { id: 5, make: "BMW", model: "3 Series", year: 2022 },
    { id: 6, make: "Audi", model: "A4", year: 2021 },
    { id: 7, make: "Hyundai", model: "Elantra", year: 2019 },
    { id: 8, make: "Kia", model: "Optima", year: 2020 },
    { id: 9, make: "Tesla", model: "Model 3", year: 2023 },
    { id: 10, make: "Nissan", model: "Altima", year: 2022 },
    { id: 11, make: "Mercedes-Benz", model: "C-Class", year: 2021 },
    { id: 12, make: "Volkswagen", model: "Passat", year: 2020 },
    { id: 13, make: "Mazda", model: "Mazda3", year: 2022 },
    { id: 14, make: "Subaru", model: "Impreza", year: 2019 },
    { id: 15, make: "Lexus", model: "ES", year: 2023 },
    { id: 16, make: "Jeep", model: "Grand Cherokee", year: 2021 }
];


app.get('/', (req, res) => {
    res.send("Hello, Express!")
})

app.post('/cars', (req, res) => {

    const newCar = req.body

    if(!newCar.make || !newCar.model || !newCar.year){
        res.status(404).json({error: "Make, Model & Year is required."})
    }else{
        cars.push(newCar)
        res.status(200).json({message: "Car added successfully.", car: newCar})
    }
})

app.get('/cars', (req, res) => {

    res.send(cars)
})

app.delete('/cars/:id', (req, res) => {

    const carId = parseInt(req.params.id)

    const index = cars.findIndex(car => car.id === carId)

    if(index === -1){

        res.status(404).json({error: "Car Not Found"})
    }else{

        cars.splice(index, 1)
        res.status(200).json({message: "Car Deleted Successfully."})
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})