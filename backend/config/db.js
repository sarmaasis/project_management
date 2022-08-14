const mongooese = require('mongoose');

const connectDB = async () => {
    const conn = await mongooese.connect(process.env.MONGO_URI);

    console.log(`MongoDb Connected: ${conn.connection.port}`);
}

module.exports = connectDB