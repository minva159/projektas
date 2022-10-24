const mongoose = require('mongoose')

var PostUsers = mongoose.model('PostUsers', 
{
    name : {type: String},
    surname : {type: String},
    email: {type: String},
    age: { type: Number, min: 18, max: 90 },
}, 'users')
// , 'users'

module.exports = {PostUsers}