import mongoose from 'mongoose';

let cachedBlogsConn: mongoose.Connection | null = null;

const connectDB = async (dbUri: string) => {
  if (!dbUri) {
    throw new Error('Database URI is not provided.');
  }

  if (cachedBlogsConn) {
    console.log('Using existing database connection for blogs');
    return cachedBlogsConn;
  }

  try {
    // Create a new connection for the blogs database
    cachedBlogsConn = mongoose.createConnection(dbUri, {
      serverSelectionTimeoutMS: 60000, // Increase timeout settings
      socketTimeoutMS: 60000, // Increase socket timeout settings
    });

    cachedBlogsConn.on('error', console.error.bind(console, 'MongoDB connection error:'));
    cachedBlogsConn.once('open', () => {
      console.log(`Connected to MongoDB blogs database: ${cachedBlogsConn?.name}`);
    });

    return cachedBlogsConn;
  } catch (err) {
    console.error('Error connecting to MongoDB blogs database:', err);
    throw err;
  }
};

export default connectDB;