const {initializeData} = require('./db/db.connect')
initializeData()

const Hotel = require('./models/hotels.model')

const express = require('express')

const app = express()

app.use(express.json())



async function createHotel(newHotel){

    try {

        const hotel = new Hotel(newHotel)

        const saveData = await hotel.save()

        return saveData
        
    } catch (error) {

        console.log("Failed to add new hotel", error)
        
    }
}

app.post('/hotels', async (req, res) => {

    try {

        const savedHotel = await createHotel(req.body)

        if(!savedHotel){

            res.status(404).json({error: "Failed to add hotel."})

        }else{

            res.status(201).json({message: "hotel added successfully.", hotel: savedHotel})

        }
        
        
    } catch (error) {

        res.status(505).json({error: "Failed to add hotel."})
        
    }
})

const PORT = 3000

app.listen(PORT, () => {

    console.log('server is running on port', PORT)
})