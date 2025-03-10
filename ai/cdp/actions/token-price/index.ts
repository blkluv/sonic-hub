// ai/cdp/actions/get-token-price-chart/index.ts
import { GET_TOKEN_PRICE_CHART_NAME } from "./name";
import { GET_TOKEN_PRICE_CHART_PROMPT } from "./prompt";
import { GetTokenPriceChartInputSchema } from "./input-schema";
import { getTokenPriceChart } from "./function";

import type { CdpAction } from "../cdp-action";
import type { GetTokenPriceChartSchemaType, GetTokenPriceChartResultBodyType } from "./types";

export class GetTokenPriceChartAction implements CdpAction<GetTokenPriceChartSchemaType, GetTokenPriceChartResultBodyType> {
  public name = GET_TOKEN_PRICE_CHART_NAME;
  public description = GET_TOKEN_PRICE_CHART_PROMPT;
  public argsSchema = GetTokenPriceChartInputSchema;
  public func = getTokenPriceChart;
}
