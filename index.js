const express = require('express')
require('dotenv').config({path: 'config.env'})
const morgan = require('morgan')
const dbConnect = require('./config/dbConnect')


// Initializing app
const app = express()

// Middlewares
app.use(express.json())

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Routes
app.use('/api/v1/categories', require('./routes/categoryRoute') )


app.get('/', (req, res) => {
    res.send('Main Page')
})

const port = process.env.PORT || 8000

// Connecting to MongoDB and running app
dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server is now running on port ${port}`)
    })
})

