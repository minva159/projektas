const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var { PostUsers } = require('../models/postUsers')

router.get('/', (req, res) => {
    PostUsers.find((err,docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records: ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new PostUsers( {
        name : req.body.name,
        surname : req.body.surname,
        email: req.body.email,
        age: req.body.age
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record: ' + JSON.stringify(err, undefined, 2))
    })

})

router.put('/:_id', (req, res) => {
    if (!ObjectID.isValid(req.params._id))
    return res.status(400).send('No record with gevin id:' + req.params._id)

    var updaterRecord = {
        name : req.body.name,
        surname : req.body.surname,
        email: req.body.email,
        age: req.body.age
    }

    PostUsers.findByIdAndUpdate(req.params._id, {$set: updaterRecord}, {new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2))
    })

})

router.delete('/:_id', (req, res) => {
    if (!ObjectID.isValid(req.params._id))
    return res.status(400).send('No record with gevin id:' + req.params._id)

    PostUsers.findByIdAndRemove(req.params._id,(err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record: ' + JSON.stringify(err, undefined, 2))
    }) 

})

module.exports = router