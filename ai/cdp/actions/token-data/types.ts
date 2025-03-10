// ai/cdp/actions/get-token-data/types.ts
import { z } from "zod";

import type { CdpActionResult } from "../cdp-action";
import type { GetTokenDataInputSchema } from "./input-schema";

export type GetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type GetTokenDataArgumentsType = z.infer<GetTokenDataSchemaType>;

export type GetTokenDataResultBodyType = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export type GetTokenDataActionResultType = CdpActionResult<GetTokenDataResultBodyType>;

