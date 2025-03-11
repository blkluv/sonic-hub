// services/dexscreener/pairs.ts
import { DexScreenerResponse, DexScreenerPair } from "./types";

export async function getTokenPairsFromAddress(tokenAddress: string): Promise<DexScreenerPair[]> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
    );
    const data: DexScreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return [];
    }

    // Filter for Sonic pairs only and sort by liquidity
    const sonicPairs = data.pairs
      .filter((pair: DexScreenerPair) => pair.chainId === "sonic")
      .sort((a: DexScreenerPair, b: DexScreenerPair) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));

    return sonicPairs;
  } catch (error) {
    console.error(error);
    return [];
  }
}
