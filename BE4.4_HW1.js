const {initializeData} = require('./db/db.connect')
initializeData()

const Restaurant  = require('./models/restaurant.model')


const express = require('express')

const app = express()

app.use(express.json())




async function restaurantUpdate(restaurantId, dataToUpdate){

    try {


        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, dataToUpdate, {new: true})

        return updatedRestaurant
        
    } catch (error) {

        console.log("Failed to update restaurant", error)
        
    }
}


app.post('/restaurant/:restaurantId', async (req, res) => {

    try {

        const updatedRestaurant = await restaurantUpdate(req.params.restaurantId, req.body)
        
        if(updatedRestaurant){

            res.status(200).json({message: "Restaurant updated successfully", updatedRestaurant: updatedRestaurant})
        }else{

            res.status(404).json({error: "restaurant not found."})
        }
    } catch (error) {

        res.status(500).json({error: "Failed to update restaurant"})
        
    }
})




const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})