// actions/create-liquidity-pool/index.ts
import { CREATE_LIQUIDITY_POOL_NAME } from "./name";
import { CREATE_LIQUIDITY_POOL_PROMPT } from "./prompt";
import { CreateLiquidityPoolInputSchema } from "./input-schema";
import { createLiquidityPool } from "./function";

import type { CdpAction } from "../cdp-action";
import type { CreateLiquidityPoolSchemaType, CreateLiquidityPoolResultBodyType } from "./types";

export class CreateLiquidityPoolAction implements CdpAction<CreateLiquidityPoolSchemaType, CreateLiquidityPoolResultBodyType> {
  public name = CREATE_LIQUIDITY_POOL_NAME;
  public description = CREATE_LIQUIDITY_POOL_PROMPT;
  public argsSchema = CreateLiquidityPoolInputSchema;
  public func = createLiquidityPool;
}