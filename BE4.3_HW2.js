const {initializeData} = require('./db/db.connect')

initializeData()

const Hotel = require('./models/hotels.model')

const express = require('express')

const app = express()

app.use(express.json())


async function deleteHotel(hotelId){

    try {

        const deletedHotel = await Hotel.findByIdAndDelete(hotelId)

        return deletedHotel
        
    } catch (error) {

        console.log('Failed to delete hotel', error)
        
    }
}


app.delete('/hotels/:hotelId',  async (req, res) => {

    try {

        const deletedHotel = await deleteHotel(req.params.hotelId)

        if(!deletedHotel){

            res.status(404).json({error: "hotel not found."})
        }else{
            res.status(200).json({message: 'hotel deleted successfully', hotel: deletedHotel})
        }
        
    } catch (error) {

        res.status(500).json({error: "failed to delete hotel."})
        
    }
})

const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)

})