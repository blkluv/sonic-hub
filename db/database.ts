// db/database.ts
import { Db } from "mongodb";
import { getMongoClient } from "@/db/mongo-client";

let database: Db;

const DATABASE_NAME = "SonicHubDatabase";

export const getDatabase = async () => {
  if (!database) {
    const client = getMongoClient();
    await client.connect();
    database = client.db(DATABASE_NAME);
  }
  return database;
};