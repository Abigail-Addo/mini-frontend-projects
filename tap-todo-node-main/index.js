require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3000

let todoRoutes = require("./routes/todoRoutes")
let Todo = require("./models/todoModel")
app = express()
// handle - get and send json data
app.use(express.json())
// set static folder
app.use(express.static("public"))

app.set("view engine", "ejs")
// html routes
app.get("/", async (req, resp) => {
    let todos = await Todo.find()
    resp.render("index", {"todos": todos})
})

//api routes
app.use("/todos", todoRoutes)

// configure database
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Connected successfully to database")
    app.listen(PORT, () => console.log(`Server started on port ${PORT} 🔥`))
}).catch(error => {
    console.log(error)
})
