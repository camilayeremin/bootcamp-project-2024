import mongoose from 'mongoose';

let cachedProjectsConn: mongoose.Connection | null = null;

const connectDBProjects = async (dbUriProjects: string) => {
  if (!dbUriProjects) {
    throw new Error('Please define the MONGO_URI_PROJECTS environment variable inside .env.local');
  }

  if (cachedProjectsConn) {
    console.log('Using existing database connection for projects');
    return cachedProjectsConn;
  }

  try {
    // Create a new connection for the projects database
    cachedProjectsConn = mongoose.createConnection(dbUriProjects, {
      serverSelectionTimeoutMS: 30000, // Increase timeout settings
      socketTimeoutMS: 60000, // Increase socket timeout settings
    });

    cachedProjectsConn.on('error', console.error.bind(console, 'MongoDB connection error:'));
    cachedProjectsConn.once('open', () => {
      console.log(`Connected to MongoDB projects database: ${cachedProjectsConn?.name}`);
    });

    return cachedProjectsConn;
  } catch (err) {
    console.error('Error connecting to MongoDB projects database:', err);
    throw err;
  }
};

export default connectDBProjects;