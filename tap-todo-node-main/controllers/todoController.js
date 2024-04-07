const Todo = require("../models/todoModel")

exports.getAllTodos = async (req, resp) =>  {
    try {
        let todos = await Todo.find()
        return resp.status(200).json(todos)
    } catch (error) {
        return resp.status(500).json({"message": error.message})
    }
}

exports.getATodo = async(req, resp) => {
    try {
        let todo = await Todo.findById(req.params.id)
        return resp.status(200).json(todo)
    } catch (error) {
        return resp.status(404).json({"message": "Could not find todo"})
    }
}

exports.addTodo = async (req, resp) => {
    try {
        let todo = await Todo.create(req.body)
        return resp.status(201).json(todo)
    } catch (error) {
        return resp.status(400).json({"message": error.message})
    }
}

exports.updateATodo = async (req, resp) => {
    try {
        // updates the to do and returns the newly updated document
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return resp.status(200).json(todo)
    } catch (error) {
        return resp.status(400).json({"message": error.message})
    }
}

exports.deleteATodo = async (req, resp) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        return resp.status(200).json({"message": "Todo successfully trashed."})
    } catch (error) {
        return resp.status(400).json({"message": error.message})
    }
}