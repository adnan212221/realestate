const mongoose = require('mongoose');

const connectDb = async(req, res)=>{
    try {
      const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected...', connect.connection.host);
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;