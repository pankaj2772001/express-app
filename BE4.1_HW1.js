const { initializeData } = require("./db/db.connect");

const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

const Restaurant = require("./models/restaurant.model");

app.listen(PORT, () => {
  console.log(`Server is running on server ${PORT}`);
});

initializeData();

async function readAllRestaurant() {
  try {
    const restaurant = await Restaurant.find();

    return restaurant;
  } catch (error) {}
}

// readAllRestaurant()

app.get("/restaurants", async (req, res) => {
  try {
    const restaurant = await readAllRestaurant();

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurnat." });
  }
});

///read restaurant by name

async function readRestaurantByName(restaurantName) {
  try {
    const restaurantByName = await Restaurant.findOne({ name: restaurantName });

    return restaurantByName;
  } catch (error) {
    console.log("Failed to fetch restaurant", error);
  }
}

// readRestaurantByName("The Spice Route")

app.get("/restaurants/:restaurantName", async (req, res) => {
  try {
    const restaurant = await readRestaurantByName(req.params.restaurantName);

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant Not Found." });
    } else {
      res.json(restaurant);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
});

//read restaurant by phoneNumber

async function readRestaurantByPhoneNumber(restaurantPhoneNumber) {
  try {
    const restaurantByPhoneNumber = await Restaurant.findOne({
      phoneNumber: restaurantPhoneNumber,
    });

    return restaurantByPhoneNumber;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const restaurant = await readRestaurantByPhoneNumber(
      req.params.phoneNumber
    );
    if (!restaurant) {
      res.status(400).json({ error: "Restaurant not found." });
    } else {
      res.json(restaurant);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
});

// read restaurant by cuisine

async function readRestaurantByCuisine(restaurantCuisine) {
  try {
    const restaurantByCuisine = await Restaurant.find({
      cuisine: restaurantCuisine,
    });

    return restaurantByCuisine;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  try {
    const restaurant = await readRestaurantByCuisine(req.params.cuisineName);

    if (restaurant.length == 0) {
      res.status(404).json({ error: "Restaurant not found." });
    } else {
      res.json(restaurant);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant" });
  }
});

async function readRestaurantByLocation(restaurantLocation) {
  try {
    const restaurantByLocation = await Restaurant.find({
      location: restaurantLocation,
    });

    return restaurantByLocation;
  } catch (error) {
    throw error;
  }
}

app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  try {
    const restaurant = await readRestaurantByLocation(
      req.params.restaurantLocation
    );

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found." });
    } else {
      res.json(restaurant);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant." });
  }
});

// const newRestaurant ={
//   "name": "Little Paris Café",
//   "cuisine": ["French"],
//   "location": "Indiranagar, Bangalore",
//   "rating": 4.5,
//   "reviews": [],
//   "website": "https://littleparis-example.com",
//   "phoneNumber": "+917890123456",
//   "openHours": "Wed-Mon: 10:00 AM - 9:30 PM",
//   "priceRange": "$$$ (31-60)",
//   "reservationsNeeded": true,
//   "isDeliveryAvailable": "true",
//   "menuUrl": "https://littleparis-example.com/menu",
//   "photos": [
//     "https://example.com/paris1.jpg",
//     "https://example.com/paris2.jpg",
//     "https://example.com/paris3.jpg"
//   ]
// }

async function createRestaurant(restaurant) {
  try {
    const newRestaurant = new Restaurant(restaurant);

    const saveRestaurant = await newRestaurant.save();

    console.log("Restaurant added successfully", saveRestaurant);
  } catch (error) {
    console.log("Failed to add new restaurnat.", error);
  }
}

// createRestaurant(newRestaurant)
