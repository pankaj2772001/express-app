const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT

app.get("/", (req, res) => {

    res.send("Hello, Express server.")
})


const books = [

  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },

  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }

];

app.post("/books", (req, res) => {

    const newBook = req.body

    if(!newBook.title || !newBook.author || !newBook.year){

        res.status(404).json({error: "Title, Year & Author Field is required"})
    }else{

        books.push(newBook)
        res.status(200).json({message: "Book added successfully", book: newBook})
    }
})

app.get("/books", (req, res) => {

    res.send(books)
})


const todos = [

  { id: 1, title: 'Water the plants', day: 'Saturday' },

];

app.post("/todos", (req, res) => {

    const newTodos = req.body

    if(!newTodos.title || !newTodos.day){

        res.status(404).json({error: 'Title and Days is required.'})
    }else{
        todos.push(newTodos)

        res.status(200).json({message: "Todos added successfully.", todo: newTodos})
    }
})

app.get('/todos', (req, res) => {
    res.send(todos)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


