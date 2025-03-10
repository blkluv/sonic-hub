// ai/agents/cdp-mint-nft/tools.ts
import { CdpAgentkit } from "@/ai/cdp/cdp-agentkit";
import { cdpTool } from "@/ai/cdp/ai-sdk";
import { MintNftAction } from "@/ai/cdp/actions/mint-nft";
import { MINT_NFT_NAME } from "@/ai/cdp/actions/mint-nft/name";

export const CDP_MINT_NFT_TOOLS = async () => {
  const agentkit = await CdpAgentkit.configureWithWallet({
    networkId: "sonic_mainnet", // Configure for Sonic Mainnet
    source: "cdp-mint-nft-agent"
  });

  return {
    [MINT_NFT_NAME]: cdpTool(new MintNftAction(), agentkit)
  };
};