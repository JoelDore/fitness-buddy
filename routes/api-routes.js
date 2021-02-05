const router = require('express').Router()
const db = require('../models')

router.get('/workouts', (req, res) => {
    setTotalDurations()
        .then(() => db.Workout.find({}))
        .then(data => {
            console.log(data.length, "records found!")
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.put('/workouts/:id', (req, res) => {
    db.Workout.update({ _id: req.params.id }, { $push: { exercises: req.body } })
        .then(data => {
            console.log("1 record updated!")
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/workouts', (req, res) => {
    db.Workout.create(req.body)
        .then(data => {
            console.log("1 record inserted!")
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/workouts/range', (req, res) => {
    setTotalDurations()
        .then(() => db.Workout.find({}).sort("-day").limit(7))
        .then(data => {
            console.log(data.length, "records found!")
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

const setTotalDurations = () => {
    return db.Workout.aggregate([
        {
            $set: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
        { $out: "workouts" }
    ])
}

module.exports = router