// actions/create-liquidity-pool/types.ts
import { z } from "zod";
import type { CdpActionResult } from "../cdp-action";
import type { CreateLiquidityPoolInputSchema } from "./input-schema";

export type CreateLiquidityPoolSchemaType = typeof CreateLiquidityPoolInputSchema;
export type CreateLiquidityPoolArgumentsType = z.infer<CreateLiquidityPoolSchemaType>;

export type CreateLiquidityPoolResultBodyType = {
  transactionHash: string;
  poolAddress: string;
  lpTokenAddress: string;
}

export type CreateLiquidityPoolActionResultType = CdpActionResult<CreateLiquidityPoolResultBodyType>;