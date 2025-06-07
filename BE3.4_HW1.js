
const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {

    res.send("Hello, From Express Server")
})

const books = [

  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },

  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },

  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }

];

app.post('/books/:id', (req, res) => {

    const bookId = parseInt(req.params.id)
    const updatedBook = req.body

    const booksToUpdate = books.find(book => book.id === bookId)
    
    if(!bookId){
        res.status(404).json({error: "Book not found."})
    }else{
        if(!updatedBook.title || !updatedBook.author || !updatedBook.year){
            res.status(404).json({error: "Title, Author and Year is required."})
        }else{
            Object.assign(booksToUpdate, updatedBook)
            res.status(200).json({message: "Book Updated successfully.", book: updatedBook})
        }
    }
})

app.get("/books", (req, res) => {
    res.send(books)
})

const todos = [

  { id: 1, title: 'Water the plants', day: 'Saturday' },

  { id: 2, title: 'Go for a walk', day: 'Sunday' }

];

app.post('/todos/:id', (req, res) => {

    const todoId = parseInt(req.params.id)
    const updatedTodo = req.body

    const todosToUpdate = todos.find(todo => todo.id === todoId)

    if(!todosToUpdate){
        res.status(404).json({error: "Todo Not Found"})
    }else{

        if(!updatedTodo.title || !updatedTodo.day){
            res.status(404).json({error: "Title and day is required."})
        }else{
            Object.assign(todosToUpdate, updatedTodo)
            res.status(200).json({message: "todos updated successfullY", todo: updatedTodo})
        }
    }




})

app.get("/todos", (req, res) => {

    res.send(todos)
})

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})

