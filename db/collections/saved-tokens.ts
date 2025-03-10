// db/collections/saved-tokens.ts
import { getCollection } from "@/db/collections/utils";
import { Collection } from "mongodb";
import { SavedToken } from "../types";

export const SAVED_TOKENS_COLLECTION_NAME = "saved-tokens";

let savedTokensCollection: Collection<SavedToken>;

export const getSavedTokensCollection = async () => {
  if (!savedTokensCollection) savedTokensCollection = await getCollection<SavedToken>(SAVED_TOKENS_COLLECTION_NAME);
  return savedTokensCollection;
};
