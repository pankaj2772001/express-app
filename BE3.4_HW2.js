const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express server.");
});

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },

  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
  },

  {
    id: 3,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
];

app.post("/movies/:id", (req, res) => {
  const updatedMovie = req.body;
  const movieId = parseInt(req.params.id);

  const movieToUpdate = movies.find((movie) => movie.id === movieId);

  if (movieToUpdate) {
    if (
      !movieToUpdate.title ||
      !movieToUpdate.director ||
      !movieToUpdate.year
    ) {
      res.status(404).json({ error: "Title, Director & Year is required." });
    } else {
      Object.assign(movieToUpdate, updatedMovie);
      res
        .status(200)
        .json({ message: "Movie updated successfully.", movie: updatedMovie });
    }
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.get("/movies", (req, res) => {
  res.send(movies);
});

const items = [
  { id: 1, itemName: "Spoon", color: "Silver", quantity: 8 },

  { id: 2, itemName: "Fork", color: "Silver", quantity: 8 },

  { id: 3, itemName: "Plate", color: "Off-White", quantity: 6 },
];

app.post("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const itemToUpdate = items.find((item) => item.id === itemId);

  if (!itemToUpdate) {
    res.status(400).json({ error: "Item not found." });
  } else {
    if (
      !itemToUpdate.itemName ||
      !itemToUpdate.color ||
      !itemToUpdate.quantity
    ) {
      res
        .status(404)
        .json({ error: "ItemName, Color & Quantity is required." });
    } else {
      Object.assign(itemToUpdate, updatedItem);
      res
        .status(200)
        .json({ message: "Item updated successfully.", item: updatedItem });
    }
  }
});

app.get("/items", (req, res) => {
  res.send(items);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
