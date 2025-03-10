// ai/agents/trading/index.ts
import { TRADING_AGENT_CAPABILITIES } from "./capabilities";
import { TRADING_AGENT_DESCRIPTION } from "./description";
import { TRADING_AGENT_NAME } from "./name";
import { TRADING_TOOLS } from "./tools";

import type { Agent } from "@/ai/agent";

export const tradingAgent: Agent = {
    name: TRADING_AGENT_NAME,
    slug: "trading",
    systemPrompt: TRADING_AGENT_DESCRIPTION,
    capabilities: TRADING_AGENT_CAPABILITIES,
    tools: TRADING_TOOLS
}