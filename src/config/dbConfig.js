import { MongoClient } from 'mongodb';

export default async function dbConnect(connectionStr) {
  let mongoClient;

  try {
      mongoClient = new MongoClient(connectionStr);
      console.log('Connecting to database cluster...');
      await mongoClient.connect();
      console.log('Succesfully connected to MongoDB Atlas!');

      return mongoClient;
  } catch (erro) {
      console.error('Failed to connect with database!', erro);
      process.exit();
  }
}