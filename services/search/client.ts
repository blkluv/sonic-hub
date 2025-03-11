import { MongoClient } from 'mongodb';

let client: MongoClient;

export const getMongoClient = () => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
  }
  return client;
};

export const getTokensCollection = async () => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_DB_NAME as string);
  return db.collection('tokens');
};