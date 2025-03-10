// actions/add-liquidity/input-schema.ts
import { z } from "zod";
import type { Amount } from "@coinbase/coinbase-sdk";

export const AddLiquidityInputSchema = z
  .object({
    poolAddress: z.string().describe("The address of the liquidity pool"),
    amountA: z.custom<Amount>().describe("The amount of the first token to add"),
    amountB: z.custom<Amount>().optional().describe("The amount of the second token to add (optional, can be calculated automatically)"),
    slippageTolerance: z.number().min(0).max(100).optional().describe("Maximum acceptable slippage in percentage"),
    deadline: z.number().optional().describe("Deadline for the transaction in seconds from now"),
  })
  .strip()
  .describe("Instructions for adding liquidity to an existing pool");
