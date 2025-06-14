const {initializeData} = require('./db/db.connect')
initializeData()

const Hotel = require('./models/hotels.model')

const express = require('express')

const app = express()

app.use(express.json())



async function updateHotel(hotelId, dataToUpdate){

    try {

        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {new: true, runValidators: true},)
        
        return updatedHotel
    } catch (error) {

        console.log('Failed to update hotel', error)
        
    }
}

app.post('/hotels/:hotelId', async (req, res) => {

    try {

        const updatedHotel = await updateHotel(req.params.hotelId, req.body)

        console.log(updatedHotel)

        if(!updatedHotel){
            res.status(404).json({error: 'Hotel not found.'})
        }else{
            res.status(200).json({message: 'Hotel updated successfully.', hotel: updatedHotel})
        }
        
    } catch (error) {

        res.status(500).json({error: 'Failed to update hotel.'})
        
    }
})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`)
})