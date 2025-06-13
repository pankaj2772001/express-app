const {initializeData} = require('./db/db.connect')
initializeData()

const Hotel  = require('./models/hotels.model')

const express = require('express')

const app = express()

app.use(express.json())


const fs = require('fs')



const jsonData = fs.readFileSync('hotel.json','utf-8')
const hotelsData = JSON.parse(jsonData)



async function seedData(){

    try {

        for(const hotelData of hotelsData ){

             const newHotel = new Hotel({

            name: hotelData.name,
            category: hotelData.category,
            location: hotelData.location,
            rating: hotelData.rating,
            reviews: hotelData.reviews,
            website: hotelData.website,
            phoneNumber: hotelData.phoneNumber,
            checkInTime: hotelData.checkInTime,
            checkOutTime: hotelData.checkOutTime,
            amenities: hotelData.amenities,
            priceRange: hotelData.priceRange,
            reservationsNeeded: hotelData.reservationsNeeded,
            isParkingAvailable: hotelData.isParkingAvailable,
            isWifiAvailable: hotelData.isWifiAvailable,
            isPoolAvailable: hotelData.isPoolAvailable,
            isSpaAvailable: hotelData.isSpaAvailable,
            isRestaurantAvailable: hotelData.isRestaurantAvailable,
            photos: hotelData.photos

        })

        const saveData = await newHotel.save()

        console.log("Hotel added successfully.", saveData)


        }
       
        
    } catch (error) {

        throw error
        
    }
}

// seedData()




async function readAllHotel(){

    try {

        const hotel = await Hotel.find()

        return hotel
        
    } catch (error) {

        console.log('Failed to fetch hotels', error)
        
    }
}


// readAllHotel()


app.get('/hotels', async (req, res) => {

    try {

        const hotels = await readAllHotel()

        if(!hotels){

            res.status(404).json({error: "Hotels not found"})
        }else{

            res.json(hotels)

        }
        
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch hotels"})
        
    }
})


async function readHotelByName(hotelName){

    try {

        const hotelByName = await Hotel.findOne({name: hotelName})

        return hotelByName
        
    } catch (error) {
        
        console.log("Failed to fetch hotel by name.", error)
    }
}

app.get('/hotels/:hotelName', async (req, res) => {


    try {

        const hotel = await readHotelByName(req.params.hotelName)

        if(!hotel){

            res.status(404).json({error: "Hotel not found."})
        }else{

            res.json(hotel)
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch hotels."})
        
    }
})



async function readHotelByPhoneNumber(hotelPhoneNo){


    try {

        const hotelByPhoneNumber = await Hotel.findOne({phoneNumber: hotelPhoneNo})

        return hotelByPhoneNumber
        
    } catch (error) {

        console.log("Failed to fetch hotel by phone number.", error)
        
    }
}

app.get('/hotels/directory/:phoneNumber', async (req, res) => {

    try {

        const hotel = await readHotelByPhoneNumber(req.params.phoneNumber)

        if(!hotel){
            res.status(404).json({error: "hotel not found."})
        }else{
            res.json(hotel)
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch hotels."})
        
    }
})

async function readHotelByRating(hotelRating){


    try {

        const hotelByRating = await Hotel.find({rating: hotelRating})

        return hotelByRating
        
    } catch (error) {

        console.log("Failed to fetch hotels by rating.", error)

    }
}

app.get('/hotels/rating/:hotelRating', async (req, res) => {

    try {

        const hotel = await readHotelByRating(req.params.hotelRating)

        if(hotel.length > 0){
            
            res.json(hotel)
        }else{
            res.status(404).json({error: "Hotel not found."})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to fetch hotels by rating."})
        
    }
})


async function readHotelByCategory(hotelCategory){


    try {

        const hotelByCategory = await Hotel.find({category: hotelCategory})

        return hotelByCategory
        
    } catch (error) {
        
        console.log('Failed to fetch hotel by category.', error)
    }
}

app.get('/hotels/category/:hotelCategory', async (req, res) => {

    try {

        const hotel = await readHotelByCategory(req.params.hotelCategory)

        if(hotel.length > 0){

            res.json(hotel)
        }else{

            res.status(404).json({error: "Hotel not found."})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to find hotel by category."})
        
    }
})


const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})