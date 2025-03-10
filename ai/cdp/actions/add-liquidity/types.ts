// actions/add-liquidity/types.ts
import { z } from "zod";
import type { CdpActionResult } from "../cdp-action";
import type { AddLiquidityInputSchema } from "./input-schema";

export type AddLiquiditySchemaType = typeof AddLiquidityInputSchema;
export type AddLiquidityArgumentsType = z.infer<AddLiquiditySchemaType>;

export type AddLiquidityResultBodyType = {
  transactionHash: string;
}

export type AddLiquidityActionResultType = CdpActionResult<AddLiquidityResultBodyType>;