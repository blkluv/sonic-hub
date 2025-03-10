// db/services/base.ts
import "server-only";
import { Collection, Document, OptionalUnlessRequiredId } from "mongodb";

/**
 * **BASE DATABASE SERVICE**
 * 
 * Add an item to the collection
 * 
 * @param {Collection} collection - The collection to add the item to
 * @param {InputType} input - The item to add
 * @returns {Promise<ItemType | null>} - The added item or null if it failed
 */
export const add = async <InputType extends Document, ItemType>(
  collection: Collection<InputType>,
  input: OptionalUnlessRequiredId<InputType>
): Promise<ItemType | null> => {
  try {
    const result = await collection.insertOne(input);
    if (result.acknowledged) {
      return { ...input, _id: result.insertedId } as unknown as ItemType;
    }
    return null;
  } catch (e: any) {
    console.error("Error adding item", e);
    return null;
  }
};

/**
 * **BASE DATABASE SERVICE**
 * 
 * Get an item from the collection
 * 
 * @param {Collection} collection - The collection to get the item from
 * @param {string} id - The id of the item
 * @param {string} partitionField - The field to use for additional filtering
 * @param {string} partitionValue - The value to filter by
 * @returns {Promise<ItemType | null>} - The item or null if it failed
 */
export const get = async <ItemType extends Document>(
  collection: Collection<ItemType>,
  id: string,
  partitionField?: string,
  partitionValue?: string,
): Promise<ItemType | null> => {
  try {
    const query: any = { id };
    if (partitionField && partitionValue) {
      query[partitionField] = partitionValue;
    }
    return await collection.findOne(query) as ItemType | null;
  } catch (e: any) {
    console.error("Error getting item", e);
    return null;
  }
};

/**
 * **BASE DATABASE SERVICE**
 * 
 * Find items in the collection
 * 
 * @param {Collection} collection - The collection to find the items in
 * @param {object} query - The query object
 * @param {object} options - The options for the query (sort, limit, etc.)
 * @returns {Promise<ItemType[]>} - The items found
 */
import { Sort } from "mongodb";

export const find = async <ItemType extends Document>(
  collection: Collection<ItemType>,
  query: object,
  options: { sort?: Sort, limit?: number } = {}
): Promise<ItemType[]> => {
  try {
    let cursor = collection.find(query);
    
    if (options.sort) {
      cursor = cursor.sort(options.sort);
    }
    
    if (options.limit) {
      cursor = cursor.limit(options.limit);
    }
    
    const items = await cursor.toArray();
    return items.map(item => {
      const { ...rest } = item;
      return rest as unknown as ItemType;
    });
  } catch (e: any) {
    console.error("Error finding items", e);
    return [];
  }
};

/**
 * **BASE DATABASE SERVICE**
 * 
 * Update an item in the collection
 * 
 * @param {Collection} collection - The collection to update the item in
 * @param {string} id - The id of the item
 * @param {string} partitionField - The field to use for additional filtering
 * @param {string} partitionValue - The value to filter by
 * @param {object} update - The update to apply
 * @returns {Promise<boolean>} - True if the item was updated, false otherwise
 */
export const update = async <ItemType extends Document>(
  collection: Collection<ItemType>,
  id: string,
  partitionField: string,
  partitionValue: string,
  update: object
): Promise<boolean> => {
  try {
    const query: any = { id };
    query[partitionField] = partitionValue;
    
    const result = await collection.updateOne(query, update);
    return result.acknowledged && result.modifiedCount > 0;
  } catch (e: any) {
    console.error("Error updating item", e);
    return false;
  }
};

/**
 * **BASE DATABASE SERVICE**
 * 
 * Delete an item from the collection
 * 
 * @param {Collection} collection - The collection to delete the item from
 * @param {string} id - The id of the item
 * @param {string} partitionField - The field to use for additional filtering
 * @param {string} partitionValue - The value to filter by
 * @returns {Promise<boolean>} - True if the item was deleted, false otherwise
 */
export const del = async <ItemType extends Document>(
  collection: Collection<ItemType>,
  id: string,
  partitionField: string,
  partitionValue: string,
): Promise<boolean> => {
  try {
    const query: any = { id };
    query[partitionField] = partitionValue;
    
    const result = await collection.deleteOne(query);
    return result.acknowledged && result.deletedCount > 0;
  } catch (e: any) {
    console.error("Error deleting item", e);
    return false;
  }
};
