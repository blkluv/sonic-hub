// db/mongo-client.ts
import { MongoClient } from "mongodb";

let client: MongoClient;

export const getMongoClient = () => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
  }
  return client;
};
