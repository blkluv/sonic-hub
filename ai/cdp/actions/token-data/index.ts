// ai/cdp/actions/get-token-data/index.ts
import { GET_TOKEN_DATA_NAME } from "./name";
import { GET_TOKEN_DATA_PROMPT } from "./prompt";
import { GetTokenDataInputSchema } from "./input-schema";
import { getTokenData } from "./function";

import type { CdpAction } from "../cdp-action";
import type { GetTokenDataSchemaType, GetTokenDataResultBodyType } from "./types";

export class GetTokenDataAction implements CdpAction<GetTokenDataSchemaType, GetTokenDataResultBodyType> {
  public name = GET_TOKEN_DATA_NAME;
  public description = GET_TOKEN_DATA_PROMPT;
  public argsSchema = GetTokenDataInputSchema;
  public func = getTokenData;
}