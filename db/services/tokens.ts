// db/services/tokens.ts
import "server-only";
import { getTokensCollection } from "../collections";
import { Token } from "../types";
import { add, del, find, get } from "./base";

// CREATE
export const addToken = async (token: Token): Promise<Token | null> => {
  return add<Token, Token>(await getTokensCollection(), token);
};

// READ
export const getToken = async (id: Token["id"]): Promise<Token | null> => {
  return get(await getTokensCollection(), id, "id", id);
};

export const findTokens = async (): Promise<Token[]> => {
  return find(
    await getTokensCollection(),
    {},
    { sort: { _id: -1 } }
  );
};

export const findTokensBySymbol = async (symbol: string): Promise<Token[]> => {
  return find(
    await getTokensCollection(),
    { symbol: { $regex: new RegExp(`^${symbol}$`, "i") } }
  );
};

export const getTokenBySymbol = async (symbol: string): Promise<Token | null> => {
  const tokens = await findTokensBySymbol(symbol);
  if (!tokens || tokens.length === 0) return null;
  if (tokens.length === 1) {
    return tokens[0];
  } else {
    const verifiedToken = tokens.find(token => token.tags.includes("verified"));
    if(verifiedToken) {
      return verifiedToken;
    } else {
      const communityToken = tokens.find(token => token.tags.includes("community"));
      if(communityToken) {
        return communityToken;
      } else {
        return tokens[0];
      }
    }
  }
};

// DELETE
export const deleteToken = async (id: Token["id"]): Promise<boolean> => {
  return del(await getTokensCollection(), id, "id", id);
};