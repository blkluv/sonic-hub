// ai/agents/cdp-deploy-nft/tools.ts
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";
import { cdpTool } from "@/ai/cdp/ai-sdk";
import { DeployNftAction } from "@/ai/cdp/actions/deploy-nft";
import { DEPLOY_NFT_NAME } from "@/ai/cdp/actions/deploy-nft/name";

export const CDP_DEPLOY_NFT_TOOLS = async () => {
  const agentkit = await CdpAgentkit.configureWithWallet({
    networkId: "sonic_mainnet", // Configure for Sonic Mainnet
    source: "cdp-deploy-nft-agent"
  });

  return {
    [DEPLOY_NFT_NAME]: cdpTool(new DeployNftAction(), agentkit)
  };
};
