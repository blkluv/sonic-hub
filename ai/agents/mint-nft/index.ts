// ai/agents/cdp-mint-nft/index.ts
import { CDP_MINT_NFT_AGENT_CAPABILITIES } from "./capabilities";
import { CDP_MINT_NFT_AGENT_DESCRIPTION } from "./description";
import { CDP_MINT_NFT_AGENT_NAME } from "./name";
import { CDP_MINT_NFT_TOOLS } from "./tools";

import type { Agent } from "@/ai/agent";

export const cdpMintNftAgent: Agent = {
    name: CDP_MINT_NFT_AGENT_NAME,
    slug: "cdp-mint-nft",
    systemPrompt: CDP_MINT_NFT_AGENT_DESCRIPTION,
    capabilities: CDP_MINT_NFT_AGENT_CAPABILITIES,
    tools: await CDP_MINT_NFT_TOOLS()
};