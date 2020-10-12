if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
// take a post form  to the server with a special parameter to tell us that we doing a put/delete request
// then our sever will be smart enough to call delete/put based on that specific parameter
const methodOverride = require('method-override')

const indexRouter = require('./routers/index')
const authorRouter = require('./routers/authors')
const bookRouter = require('./routers/books')



app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
// Every other component will be put into this layout HTML
// So we do not have to repeat the beginning and ending of each HTML
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
const book = require('./models/book')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection 
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)