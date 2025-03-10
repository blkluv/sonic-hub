
// actions/add-liquidity/index.ts
import { ADD_LIQUIDITY_NAME } from "./name";
import { ADD_LIQUIDITY_PROMPT } from "./prompt";
import { AddLiquidityInputSchema } from "./input-schema";
import { addLiquidity } from "./function";

import type { CdpAction } from "../cdp-action";
import type { AddLiquiditySchemaType, AddLiquidityResultBodyType } from "./types";

export class AddLiquidityAction implements CdpAction<AddLiquiditySchemaType, AddLiquidityResultBodyType> {
  public name = ADD_LIQUIDITY_NAME;
  public description = ADD_LIQUIDITY_PROMPT;
  public argsSchema = AddLiquidityInputSchema;
  public func = addLiquidity;
}
