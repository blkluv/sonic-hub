// ai/agents/liquidity/tools.ts
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";

import { 
    CREATE_LIQUIDITY_POOL_NAME, 
    ADD_LIQUIDITY_NAME, 
    REMOVE_LIQUIDITY_NAME, 
} from "@/ai/action-names";

import { cdpTool } from "@/ai/cdp/ai-sdk";
import { CreateLiquidityPoolAction } from "@/ai/cdp/actions/create-liquidity";
import { AddLiquidityAction } from "@/ai/cdp/actions/add-liquidity";
import { RemoveLiquidityAction } from "@/ai/cdp/actions/remove-liquidity";


// Initialize CDP Agentkit
const cdpAgentkit = await CdpAgentkit.configureWithWallet({
    cdpApiKeyName: process.env.CDP_API_KEY_NAME,
    cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
    networkId: process.env.SONIC_NETWORK_ID,
    source: "liquidity-agent"
});

export const LIQUIDITY_TOOLS = {
    [`liquidity-${CREATE_LIQUIDITY_POOL_NAME}`]: cdpTool(new CreateLiquidityPoolAction(), cdpAgentkit),
    [`liquidity-${ADD_LIQUIDITY_NAME}`]: cdpTool(new AddLiquidityAction(), cdpAgentkit),
    [`liquidity-${REMOVE_LIQUIDITY_NAME}`]: cdpTool(new RemoveLiquidityAction(), cdpAgentkit),
};
