const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.warn('WARNING: MONGO_URI is not defined in the environment variables. Database features will be bypassed.');
      return false;
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Server will continue running, but database writes will be bypassed.');
    return false;
  }
};

module.exports = connectDB;
