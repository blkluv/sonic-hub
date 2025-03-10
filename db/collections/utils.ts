// db/collections/utils.ts
// import { Collection, Db } from "mongodb";
import { getDatabase } from "@/db/database";

export interface VectorSearchOptions<ItemType> {
  embeddingPaths?: (keyof ItemType)[];
}

import { Document } from "mongodb";

export const getCollection = async <ItemType extends Document>(
  collectionName: string,
  vectorSearchOptions?: VectorSearchOptions<ItemType>
) => {
  const database = await getDatabase();
  const collection = database.collection<ItemType>(collectionName);
  
  // Create indexes if needed
  if (vectorSearchOptions?.embeddingPaths?.length) {
    for (const path of vectorSearchOptions.embeddingPaths) {
      // Create a vector search index for MongoDB Atlas
      await database.command({
        createIndexes: collectionName,
        indexes: [
          {
            name: `${String(path)}_vector_index`,
            key: { [String(path)]: "vector" },
            weights: { [String(path)]: 1 },
            vectorOptions: {
              type: "cosine",
              dimensions: 1536,
              numLists: 16, // This value may need to be adjusted based on your data size
              similarity: "cosine"
            }
          }
        ]
      }).catch(e => console.error(`Error creating vector index for ${String(path)}:`, e));
      
      // Also create a regular index on partitionKey equivalent
      await collection.createIndex({ [String(path)]: 1 });
    }
  }
  
  return collection;
};
