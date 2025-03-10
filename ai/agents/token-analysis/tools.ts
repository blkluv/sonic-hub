// ai/agents/token-analysis/tools.ts
import { CdpAgentkit, cdpTool } from "@/ai/cdp";
import {
    GetTokenDataAction
} from "@/ai/cdp/actions/token-data";
import {
    GetTokenPriceChartAction
} from "@/ai/cdp/actions/token-price";

import { 
  GET_TOKEN_DATA_NAME,
  GET_TOKEN_PRICE_CHART_NAME,
} from "@/ai/action-names";

// Initialize CDP Agentkit
const cdpAgentkit = await CdpAgentkit.configureWithWallet({
  networkId: process.env.SONIC_MAINNET_NETWORK_ID,
  cdpApiKeyName: process.env.CDP_API_KEY_NAME,
  cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
  source: "token-analysis-agent"
});

export const TOKEN_ANALYSIS_TOOLS = {
  [`tokenanalysis-${GET_TOKEN_DATA_NAME}`]: cdpTool(new GetTokenDataAction(), cdpAgentkit),
  [`tokenanalysis-${GET_TOKEN_PRICE_CHART_NAME}`]: cdpTool(new GetTokenPriceChartAction(), cdpAgentkit),
};
