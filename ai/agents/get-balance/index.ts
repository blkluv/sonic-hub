
// ai/agents/cdp-get-balance/index.ts
import { CDP_GET_BALANCE_AGENT_CAPABILITIES } from "./capabilities";
import { CDP_GET_BALANCE_AGENT_DESCRIPTION } from "./description";
import { CDP_GET_BALANCE_AGENT_NAME } from "./name";
import { CDP_GET_BALANCE_TOOLS } from "./tools";

import type { Agent } from "@/ai/agent";

export const cdpGetBalanceAgent: Agent = {
    name: CDP_GET_BALANCE_AGENT_NAME,
    slug: "cdp-get-balance",
    systemPrompt: CDP_GET_BALANCE_AGENT_DESCRIPTION,
    capabilities: CDP_GET_BALANCE_AGENT_CAPABILITIES,
    tools: await CDP_GET_BALANCE_TOOLS()
};