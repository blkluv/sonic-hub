// db/services/knowledge.ts
import "server-only";
import { getKnowledgeCollection } from "../collections";
import { ObjectId } from "mongodb";
import { Knowledge, KnowledgeInput } from "../types";
import { add, del, find, get, update } from "./base";

// CREATE
export const addKnowledge = async (knowledge: KnowledgeInput): Promise<Knowledge | null> => {
  const knowledgeWithId = { ...knowledge, id: new ObjectId().toString() };
  return add<Knowledge, Knowledge>(await getKnowledgeCollection(), knowledgeWithId);
};

// READ
export const getKnowledge = async (id: Knowledge["id"], baseUrl: Knowledge["baseUrl"]): Promise<Knowledge | null> => {
  return get(await getKnowledgeCollection(), id, "baseUrl", baseUrl);
};

export const findKnowledgeByBaseUrl = async (baseUrl: Knowledge["baseUrl"]): Promise<Knowledge[]> => {
  return find(
    await getKnowledgeCollection(),
    { baseUrl }
  );
};

export const findRelevantKnowledge = async (query: number[]): Promise<(Knowledge & { distance: number })[]> => {
  const collection = await getKnowledgeCollection();
  try {
    // Using MongoDB's $vectorSearch aggregation
    const result = await collection.aggregate([
      {
        $vectorSearch: {
          index: "summaryEmbedding_vector_index",
          path: "summaryEmbedding",
          queryVector: query,
          numCandidates: 100,
          limit: 10,
          filter: { score: { $gt: 0.65 } }
        }
      },
      {
        $project: {
          id: 1,
          summary: 1,
          markdown: 1,
          name: 1,
          baseUrl: 1,
          title: 1,
          description: 1,
          favicon: 1,
          url: 1,
          distance: { $meta: "vectorSearchScore" }
        }
      }
    ]).toArray();
    
    return result as (Knowledge & { distance: number })[];
  } catch (e) {
    console.error("Vector search error:", e);
    return [];
  }
};

export const findKnowledgeByUrl = async (url: string): Promise<Knowledge[]> => {
  return find(
    await getKnowledgeCollection(),
    { url }
  );
};

// UPDATE
export const updateKnowledgeContent = async (
  id: Knowledge["id"],
  baseUrl: Knowledge["baseUrl"],
  markdown: string,
  markdownEmbedding: number[]
): Promise<boolean> => {
  return update(
    await getKnowledgeCollection(),
    id,
    "baseUrl",
    baseUrl,
    { $set: { markdown, markdownEmbedding } }
  );
};

// DELETE
export const deleteKnowledge = async (id: Knowledge["id"], baseUrl: Knowledge["baseUrl"]): Promise<boolean> => {
  return del(await getKnowledgeCollection(), id, "baseUrl", baseUrl);
};