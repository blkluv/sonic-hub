// ai/agents/cdp-deploy-token/tools.ts
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";
import { cdpTool } from "@/ai/cdp/ai-sdk";
import { DeployTokenAction } from "@/ai/cdp/actions/deploy-token";
import { DEPLOY_TOKEN_NAME } from "@/ai/cdp/actions/deploy-token/name";

export const CDP_DEPLOY_TOKEN_TOOLS = async () => {
  const agentkit = await CdpAgentkit.configureWithWallet({
    networkId: "sonic_mainnet", // Configure for Sonic Mainnet
    source: "cdp-deploy-token-agent"
  });

  return {
    [DEPLOY_TOKEN_NAME]: cdpTool(new DeployTokenAction(), agentkit)
  };
};
