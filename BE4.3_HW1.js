const {initializeData} = require('./db/db.connect')
initializeData()

const Restaurant = require('./models/restaurant.model')

const express = require('express')

const app = express()

app.use(express.json())


async function deleteRestaurant(restaurantId){


    try {

        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId)

        return deletedRestaurant  
        
    } catch (error) {

        console.log("Failed to delete restaurant")
        
    }


    
}

// deleteRestaurant("683be26e83358df451ca8e0b")


app.delete('/restaurants/:restaurantId', async (req, res) => {


    try {

        const deletedRestaurant = await deleteRestaurant(req.params.restaurantId)
        if(deletedRestaurant){
            res.status(200).json({message: "Restaurant deleted successfully.", restaurant: deletedRestaurant})
        }else{
            res.status(404).json({error: "Restaurant not found"})
        }
        
    } catch (error) {

        res.status(500).json({error: "Failed to delete restaurant"})
        
    }
})


const PORT = 3000

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})











