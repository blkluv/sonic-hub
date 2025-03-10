// actions/remove-liquidity/input-schema.ts
import { z } from "zod";
import type { Amount } from "@coinbase/coinbase-sdk";

export const RemoveLiquidityInputSchema = z
  .object({
    poolAddress: z.string().describe("The address of the liquidity pool"),
    lpTokenAmount: z.custom<Amount>().describe("The amount of LP tokens to burn"),
    minAmountA: z.custom<Amount>().optional().describe("Minimum amount of token A to receive"),
    minAmountB: z.custom<Amount>().optional().describe("Minimum amount of token B to receive"),
    deadline: z.number().optional().describe("Deadline for the transaction in seconds from now"),
  })
  .strip()
  .describe("Instructions for removing liquidity from a pool");