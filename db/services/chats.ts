// db/services/chats.ts
import "server-only";
import { getChatsCollection } from "../collections";
import { Chat } from "../types";
import { Message } from "ai";
import { add, del, find, get, update } from "./base";

// CREATE
export const addChat = async (chat: Chat): Promise<Chat | null> => {
  return add<Chat, Chat>(await getChatsCollection(), chat);
};

// READ
export const getChat = async (id: Chat["id"], userId: Chat["userId"]): Promise<Chat | null> => {
  return get(await getChatsCollection(), id, "userId", userId);
};

export const findChatsByUser = async (userId: Chat["userId"]): Promise<Chat[]> => {
  return find(
    await getChatsCollection(),
    { userId },
    { sort: { _id: -1 } } // Sort by _id descending (equivalent to _ts in Cosmos)
  );
};

// UPDATE
export const updateChatTagline = async (id: Chat["id"], userId: Chat["userId"], tagline: string): Promise<boolean> => {
  return update(
    await getChatsCollection(),
    id,
    "userId",
    userId,
    { $set: { tagline } }
  );
};

export const addMessageToChat = async (id: Chat["id"], userId: Chat["userId"], message: Message): Promise<boolean> => {
  return update(
    await getChatsCollection(),
    id,
    "userId",
    userId,
    { $push: { messages: message } }
  );
};

export const updateChatMessages = async (id: Chat["id"], userId: Chat["userId"], messages: Message[]): Promise<boolean> => {
  return update(
    await getChatsCollection(),
    id,
    "userId",
    userId,
    { $set: { messages } }
  );
};

// DELETE
export const deleteChat = async (id: Chat["id"], userId: Chat["userId"]): Promise<boolean> => {
  return del(await getChatsCollection(), id, "userId", userId);
};