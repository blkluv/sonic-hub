// ai/agents/wallet/tools.ts
import { 
    GET_WALLET_DETAILS_NAME,
    GET_BALANCE_NAME
} from "@/ai/cdp/actions/names";

import { cdpTool } from "@/ai/cdp";
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";

import {
    GetWalletDetailsAction,
} from "@/ai/cdp/actions/get-wallet-details";
import { GetBalanceAction } from "@/ai/cdp/actions/get-balance";

// Configure CDP Agentkit for Sonic Mainnet
const networkId = "sonic-mainnet"; // Assuming this is the correct network ID
const agentkit = await CdpAgentkit.configureWithWallet({
    networkId,
    source: "wallet-agent"
});

export const WALLET_TOOLS = {
    [`wallet-${GET_WALLET_DETAILS_NAME}`]: cdpTool(new GetWalletDetailsAction(), agentkit),
    [`wallet-${GET_BALANCE_NAME}`]: cdpTool(new GetBalanceAction(), agentkit)
}