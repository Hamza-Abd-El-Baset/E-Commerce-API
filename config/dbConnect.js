const mongoose = require('mongoose')

module.exports = async () => {
    const {connection} = await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB successfully ^_^", `MongoDB hosted at ${connection.host}`)
}
