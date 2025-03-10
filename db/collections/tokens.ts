// db/collections/tokens.ts
import { getCollection } from "@/db/collections/utils";
import { Collection } from "mongodb";
import { Token } from "../types";

export const TOKENS_COLLECTION_NAME = "tokens";

let tokensCollection: Collection<Token>;

export const getTokensCollection = async () => {
  if (!tokensCollection) tokensCollection = await getCollection<Token>(TOKENS_COLLECTION_NAME);
  return tokensCollection;
};