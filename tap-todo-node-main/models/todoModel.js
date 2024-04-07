const mongoose = require("mongoose")

// create a schema - how should the table look like
const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name field is required."],
    },
    description: {
        type: String,
        required: [true, "The description field is required."]
    },
    is_completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

// a model - our way of interacting with the schema/ table in the db
const Todo = mongoose.model("Todo", TodoSchema)
// export the model
module.exports = Todo