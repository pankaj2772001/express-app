const mongoose = require('mongoose')
require('dotenv').config()

const mongooseUri = process.env.MONGODB

async function initializeData() {
    
    try {

        await mongoose.connect(mongooseUri)
                        .then(() => {
                            console.log("DB CONNECTED")
                        }).catch((error) => {

                            console.log("Failed to connect DB.")
                        })
        
    } catch (error) {
        
        console.log("Failed to connect DB", error)
    }
}


module.exports = {initializeData}