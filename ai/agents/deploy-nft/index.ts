// ai/agents/cdp-deploy-nft/index.ts
import { CDP_DEPLOY_NFT_AGENT_CAPABILITIES } from "./capabilities";
import { CDP_DEPLOY_NFT_AGENT_DESCRIPTION } from "./description";
import { CDP_DEPLOY_NFT_AGENT_NAME } from "./name";
import { CDP_DEPLOY_NFT_TOOLS } from "./tools";

import type { Agent } from "@/ai/agent";

export const createCdpDeployNftAgent = async (): Promise<Agent> => {
    return {
        name: CDP_DEPLOY_NFT_AGENT_NAME,
        slug: "cdp-deploy-nft",
        systemPrompt: CDP_DEPLOY_NFT_AGENT_DESCRIPTION,
        capabilities: CDP_DEPLOY_NFT_AGENT_CAPABILITIES,
        tools: await CDP_DEPLOY_NFT_TOOLS(),
    };
};