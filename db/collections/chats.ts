// db/collections/chats.ts
import { getCollection } from "@/db/collections/utils";
import { Collection } from "mongodb";
import { Chat } from "../types";

export const CHATS_COLLECTION_NAME = "chats";

let chatsCollection: Collection<Chat>;

export const getChatsCollection = async () => {
  if (!chatsCollection) chatsCollection = await getCollection<Chat>(CHATS_COLLECTION_NAME);
  return chatsCollection;
};