// ai/agents/cdp-get-balance/tools.ts
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";
import { cdpTool } from "@/ai/cdp/ai-sdk";
import { GetBalanceAction } from "@/ai/cdp/actions/get-balance";
import { GET_BALANCE_NAME } from "@/ai/cdp/actions/get-balance/name";

export const CDP_GET_BALANCE_TOOLS = async () => {
  const agentkit = await CdpAgentkit.configureWithWallet({
    networkId: "sonic_mainnet", // Configure for Sonic Mainnet
    source: "cdp-get-balance-agent"
  });

  return {
    [GET_BALANCE_NAME]: cdpTool(new GetBalanceAction(), agentkit)
  };
};