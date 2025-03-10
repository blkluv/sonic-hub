// ai/agents/trading/tools.ts
import { 
    GET_WALLET_DETAILS_NAME,
    TRADE_NAME
} from "@/ai/cdp/actions/names";

import { cdpTool } from "@/ai/cdp";
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";

import {
    GetWalletDetailsAction,
} from "@/ai/cdp/actions/get-wallet-details";
import { TradeAction } from "@/ai/cdp/actions/trade";

// Configure CDP Agentkit for Sonic Mainnet
const networkId = "sonic-mainnet"; // Assuming this is the correct network ID
const agentkit = await CdpAgentkit.configureWithWallet({
    networkId,
    source: "trading-agent"
});

export const TRADING_TOOLS = {
    [`trading-${GET_WALLET_DETAILS_NAME}`]: cdpTool(new GetWalletDetailsAction(), agentkit),
    [`trading-${TRADE_NAME}`]: cdpTool(new TradeAction(), agentkit)
}