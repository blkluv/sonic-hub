// db/collections/knowledge.ts
import { getCollection } from "@/db/collections/utils";
import { Collection } from "mongodb";
import { Knowledge } from "@/db/types";

export const KNOWLEDGE_COLLECTION_NAME = "knowledge";

let knowledgeCollection: Collection<Knowledge>;

const embeddingPaths: (keyof Knowledge)[] = ["summaryEmbedding"];

export const getKnowledgeCollection = async () => {
  if (!knowledgeCollection) knowledgeCollection = await getCollection<Knowledge>(
    KNOWLEDGE_COLLECTION_NAME, 
    { embeddingPaths }
  );
  return knowledgeCollection;
};