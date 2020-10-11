if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routers/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
// Every other component will be put into this layout HTML
// So we do not have to repeat the beginning and ending of each HTML
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection 
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)