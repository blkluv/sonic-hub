// ai/cdp/actions/get-token-price-chart/input-schema.ts
import { z } from "zod";

export const GetTokenPriceChartInputSchema = z
  .object({
    tokenId: z.string().describe("The CoinGecko ID of the token (e.g., 'bitcoin')"),
    days: z.number().default(30).describe("Number of days of historical data to fetch (1, 7, 14, 30, 90, 180, 365, max)"),
  })
  .strip()
  .describe("Parameters for getting token price chart data");