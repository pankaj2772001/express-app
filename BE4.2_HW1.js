const {initializeData} = require('./db/db.connect')

initializeData()

const express  = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())
const Restaurant = require('./models/restaurant.model')



async function createRestaurant(newRestaurant){


    try {

        const restaurant = new Restaurant(newRestaurant)

        const saveData = await restaurant.save()

        return saveData
        
    } catch (error) {

        throw error
        
    }
}

// createRestaurant()

app.post('/restaurants', async (req, res) => {


    try {

        const restaurant = await createRestaurant(req.body)

        res.status(200).json({message: "Restaurant added successfully.", restaurant: restaurant})
        
    } catch (error) {

        res.status(500).json({error: "Failed to add restaurant."})
        
    }
})


const PORT = process.env.PORT

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})