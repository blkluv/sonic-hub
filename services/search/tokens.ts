import { getTokensCollection } from "./client";

import type { Token } from "@/db/types";

export const searchForTokens = async (q: string): Promise<Token[]> => {
  try {
    const tokensCollection = await getTokensCollection();
    
    // Create a text index if it doesn't exist (you would typically do this in a setup script)
     await tokensCollection.createIndex({ name: "text", symbol: "text", description: "text" });
    
    const query = q.endsWith('*') 
      ? { $or: [
          { name: { $regex: `^${q.slice(0, -1)}`, $options: 'i' } },
          { symbol: { $regex: `^${q.slice(0, -1)}`, $options: 'i' } }
        ]}
      : { $text: { $search: q } };
    
    const results = await tokensCollection.find(query).limit(10).toArray();
    return results as unknown as Token[];
  } catch (err) {
    console.error("Error searching for tokens:", err);
    return [] as Token[];
  }
};