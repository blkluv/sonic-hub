
// ai/agents/cdp-deploy-token/index.ts
import { CDP_DEPLOY_TOKEN_AGENT_CAPABILITIES } from "./capabilities";
import { CDP_DEPLOY_TOKEN_AGENT_DESCRIPTION } from "./description";
import { CDP_DEPLOY_TOKEN_AGENT_NAME } from "./name";
import { CDP_DEPLOY_TOKEN_TOOLS } from "./tools";

import type { Agent } from "@/ai/agent";

export const cdpDeployTokenAgent: Agent = {
    name: CDP_DEPLOY_TOKEN_AGENT_NAME,
    slug: "cdp-deploy-token",
    systemPrompt: CDP_DEPLOY_TOKEN_AGENT_DESCRIPTION,
    capabilities: CDP_DEPLOY_TOKEN_AGENT_CAPABILITIES,
    tools: await CDP_DEPLOY_TOKEN_TOOLS(),
};