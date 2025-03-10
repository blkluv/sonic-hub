// ai/cdp/actions/get-token-price-chart/types.ts
import { z } from "zod";

import type { CdpActionResult } from "../cdp-action";
import type { GetTokenPriceChartInputSchema } from "./input-schema";

export type GetTokenPriceChartSchemaType = typeof GetTokenPriceChartInputSchema;

export type GetTokenPriceChartArgumentsType = z.infer<GetTokenPriceChartSchemaType>;

export type PriceDataPoint = {
  timestamp: number;
  price: number;
}

export type GetTokenPriceChartResultBodyType = {
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  days: number;
  priceData: PriceDataPoint[];
}

export type GetTokenPriceChartActionResultType = CdpActionResult<GetTokenPriceChartResultBodyType>;