const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        required: true,
        default: Date.now()
    },
    exercises: [{
        type: mongoose.Types.ObjectId,
        ref: "Exercise",
        required: true
    }]
})

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout