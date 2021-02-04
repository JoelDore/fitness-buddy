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

router.put('/workouts', (req, res) => {

})

router.post('/workouts', (req, res) => {

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