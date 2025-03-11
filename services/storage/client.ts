import { MongoClient, GridFSBucket } from 'mongodb';

let client: MongoClient;

export const getMongoClient = () => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
  }
  return client;
};
export const getGridFSBucket = async () => {
  const client = await getMongoClient();
  const db = client.db(process.env.MONGODB_DB_NAME as string);
  return new GridFSBucket(db, { bucketName: 'images' });
};

const storageClient = { getMongoClient, getGridFSBucket };
export default storageClient;