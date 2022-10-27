const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vanami:vanami12@cluster0.qvpyip3.mongodb.net/mongo', {useNewUrlParser: true, useUnifiedTopology:true},
err => {
    if (!err)
    console.log('Mongodb connection succeeded.')
    else
    console.log('Error while connecting Mongodb : '+ JSON.stringify(err, undefined, 2))
});