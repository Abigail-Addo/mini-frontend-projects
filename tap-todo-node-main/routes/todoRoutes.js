const express = require("express")
let todoController = require("../controllers/todoController")

let router = express.Router()

router.get("/", todoController.getAllTodos)
router.get("/:id", todoController.getATodo)
router.post("/",  todoController.addTodo)
router.patch("/:id", todoController.updateATodo)
router.delete("/:id", todoController.deleteATodo)

module.exports = router