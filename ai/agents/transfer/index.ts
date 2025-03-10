// ai/agents/transfer/index.ts
import { TRANSFER_AGENT_CAPABILITIES } from "./capabilities";
import { TRANSFER_AGENT_DESCRIPTION } from "./description";
import { TRANSFER_AGENT_NAME } from "./name";
import { TRANSFER_TOOLS } from "./tools";

import type { Agent } from "@/ai/agent";

export const transferAgent: Agent = {
    name: TRANSFER_AGENT_NAME,
    slug: "transfer",
    systemPrompt: TRANSFER_AGENT_DESCRIPTION,
    capabilities: TRANSFER_AGENT_CAPABILITIES,
    tools: TRANSFER_TOOLS
}