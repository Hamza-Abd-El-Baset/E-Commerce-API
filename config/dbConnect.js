const mongoose = require('mongoose')

module.exports = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        console.log(connection)
        console.log("Connected to MongoDB successfully ^_^", `MongoDB hosted at ${connection.host}`)
    }
    catch(err) {
        console.log("Failed to connect to MongoDB", err)
        process.exit(1)
    }
}
