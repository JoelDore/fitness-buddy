const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
    type: {
        type: String,
        enum: ["resistance", "cardio"],
        required: "Exercise type is required"
    },
    name: {
        type: String,
        required: "Exercise name is required"
    },
    duration: {
        type: Number,
        min: [Number.MIN_VALUE, "Duration must be greater than zero"],
        required: "Exercise duration is required"
    },
    distance: {
        type: Number,
        min: [Number.MIN_VALUE, "Distance must be greater than zero"],
        required: () => this.type === "cardio"
    },
    weight: {
        type: Number,
        min: [Number.MIN_VALUE, "Weight must be greater than zero"],
        required: () => this.type === "resistance"
    },
    reps: {
        type: Number,
        min: [1, "Must have at least 1 rep"],
        required: true
    },
    sets: {
        type: Number,
        min: [1, "Must have at least 1 set"],
        required: () => this.type === "resistance"
    }
})

const Exercise = mongoose.model("Exercise", ExerciseSchema)

module.exports = Exercise