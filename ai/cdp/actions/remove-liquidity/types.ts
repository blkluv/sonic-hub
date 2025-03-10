// actions/remove-liquidity/types.ts
import { z } from "zod";
import type { CdpActionResult } from "../cdp-action";
import type { RemoveLiquidityInputSchema } from "./input-schema";

export type RemoveLiquiditySchemaType = typeof RemoveLiquidityInputSchema;
export type RemoveLiquidityArgumentsType = z.infer<RemoveLiquiditySchemaType>;

export type RemoveLiquidityResultBodyType = {
  transactionHash: string;
}

export type RemoveLiquidityActionResultType = CdpActionResult<RemoveLiquidityResultBodyType>;