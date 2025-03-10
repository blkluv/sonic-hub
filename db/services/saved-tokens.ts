// db/services/saved-tokens.ts
import "server-only";
import { getSavedTokensCollection } from "../collections/saved-tokens";
import { SavedToken } from "../types/saved-token";
import { add, del, find, get } from "./base";

// CREATE
export const addSavedToken = async (token: SavedToken): Promise<SavedToken | null> => {
  return add<SavedToken, SavedToken>(await getSavedTokensCollection(), token);
};

// READ
export const getSavedToken = async (id: SavedToken["id"], userId: SavedToken["userId"]): Promise<SavedToken | null> => {
  return get(await getSavedTokensCollection(), id, "userId", userId);
};

export const findSavedTokensByUserId = async (userId: string): Promise<SavedToken[]> => {
  return find(
    await getSavedTokensCollection(),
    { userId },
    { sort: { _id: -1 } }
  );
};

// DELETE
export const deleteSavedToken = async (id: SavedToken["id"], userId: SavedToken["userId"]): Promise<boolean> => {
  return del(await getSavedTokensCollection(), id, "userId", userId);
};