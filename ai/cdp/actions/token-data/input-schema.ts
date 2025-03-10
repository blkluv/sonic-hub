// ai/cdp/actions/get-token-data/input-schema.ts
import { z } from "zod";

export const GetTokenDataInputSchema = z
  .object({
    tokenId: z.string().describe("The CoinGecko ID of the token (e.g., 'bitcoin')"),
    symbol: z.string().optional().describe("The symbol of the token (e.g., 'BTC')"),
  })
  .strip()
  .describe("Parameters for getting token data");