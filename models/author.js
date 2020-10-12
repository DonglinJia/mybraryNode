const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// Do something before executing remove function
authorSchema.pre('remove', function(next) {
    Book.find({author: this.id}, (err, books) => {
        if (err) {
            // pass the error in the next function
            next(err)
        } else if (books.length > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})

// Author will be the name of the table 
// and the structure is defined as authorSchema
module.exports = mongoose.model('Author', authorSchema)