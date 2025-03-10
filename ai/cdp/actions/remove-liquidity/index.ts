
// actions/remove-liquidity/index.ts
import { REMOVE_LIQUIDITY_NAME } from "./name";
import { REMOVE_LIQUIDITY_PROMPT } from "./prompt";
import { RemoveLiquidityInputSchema } from "./input-schema";
import { removeLiquidity } from "./function";

import type { CdpAction } from "../cdp-action";
import type { RemoveLiquiditySchemaType, RemoveLiquidityResultBodyType } from "./types";

export class RemoveLiquidityAction implements CdpAction<RemoveLiquiditySchemaType, RemoveLiquidityResultBodyType> {
  public name = REMOVE_LIQUIDITY_NAME;
  public description = REMOVE_LIQUIDITY_PROMPT;
  public argsSchema = RemoveLiquidityInputSchema;
  public func = removeLiquidity;
}
