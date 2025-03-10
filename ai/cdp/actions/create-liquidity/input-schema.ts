// actions/create-liquidity-pool/input-schema.ts
import { z } from "zod";
import type { Amount } from "@coinbase/coinbase-sdk";

export const CreateLiquidityPoolInputSchema = z
  .object({
    tokenA: z.string().describe("The address of the first token in the pair"),
    tokenB: z.string().describe("The address of the second token in the pair"),
    amountA: z.custom<Amount>().describe("The amount of first token to add as initial liquidity"),
    amountB: z.custom<Amount>().describe("The amount of second token to add as initial liquidity"),
    fee: z.number().min(0).max(1).optional().describe("Optional fee tier for the pool (e.g., 0.003 for 0.3%)"),
    contractAddress: z.string().describe("The address of the liquidity pool contract"),
  })
  .strip()
  .describe("Instructions for creating a new liquidity pool");