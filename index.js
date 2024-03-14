const express = require('express')
require('dotenv').config({path: 'config.env'})

const app = express()

app.get('/', (req, res) => {
    res.send("Response 2")
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`)
})