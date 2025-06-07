const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {

    res.send("Hello, From Express Server")
})

const books = [

  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },

  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },

  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }

];

app.delete("/books/:id", (req, res) => {

    const bookId = parseInt(req.params.id)

    const index = books.findIndex(book => book.id === bookId)

    if(index === -1){
        res.status(404).json({error: "Book not found."})
    }else{

        books.splice(index, 1)
        res.status(200).json({message: "Book deleted successfully."})
    }

})

app.get('/books', (req, res) => {

    res.send(books)
    
})


const todos = [

  { id: 1, title: 'Water the plants', day: 'Saturday' },

  { id: 2, title: 'Go for a walk', day: 'Sunday' }

];


app.delete('/todos/:id', (req, res) => {

    const todoId = req.params.id

    const index = todos.findIndex(todo => todo.id == todoId)

    if(index === -1){
        res.status(404).json({error: "Todos does not exist"})
    }else{
        todos.splice(index, 1)
        res.status(200).json({message: "todo deleted successfully."})
    }
})

app.get('/todos', (req, res) => {

    res.send(todos)
})



app.listen(PORT, () => {

    console.log(`Server is runnning on port ${PORT}`)
})