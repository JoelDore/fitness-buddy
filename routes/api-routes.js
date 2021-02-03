const router = require('express').Router()
const db = require('../models')

router.get('/workouts', (req, res) => {
    db.Workout.find({})
        .then(data => {
            console.log(data.length, "records found!")
            res.send(data)
        })
})

router.put('/workouts', (req, res) => {

})

router.post('/workouts', (req, res) => {

})

router.get('/workouts/range', (req, res) => {

})

module.exports = router