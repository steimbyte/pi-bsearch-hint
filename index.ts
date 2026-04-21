/**
 * bsearch Hint Extension
 * 
 * Injects bsearch CLI hint into the system prompt only when
 * the user asks about searching, browsing, or looking up info online.
 */

import { type ExtensionAPI } from "@mariozechner/pi-coding-agent";

const BSEARCH_HINT = `

## Web Search Tool

When user asks to search, browse, or look up information online, use:
  bsearch "query"              # 10 results, safesearch off
  bsearch "query" -c 5       # 5 results  
  bsearch "query" -f pd      # past day
  bsearch "query" -f pw      # past week

Options: -c count (1-20), -f freshness (pd/pw/pm), -s safesearch`;

// Keywords that trigger bsearch hint injection
const SEARCH_TRIGGERS = /\b(search|web|browse|online|lookup|find\s+(me\s+)?(info|information|results?|latest|recent|news|articles?|about|on\s+(the\s+)?(web|internet))|google|look\s+up|research|scrape|crawl)\b/i;

export default async function (pi: ExtensionAPI): Promise<void> {
  pi.on("before_agent_start", async (event) => {
    try {
      // Get the user's actual prompt (last user message)
      const messages = (event as any).messages || [];
      const userMessage = messages
        .filter((m: any) => m.role === "user")
        .pop();
      
      const text = typeof userMessage?.content === "string" 
        ? userMessage.content 
        : "";

      // Only inject if search-related keywords are present
      if (SEARCH_TRIGGERS.test(text)) {
        if (event.systemPromptOptions) {
          event.systemPromptOptions.appendSystemPrompt = 
            (event.systemPromptOptions.appendSystemPrompt || "") + BSEARCH_HINT;
        }
      }
    } catch (e) {
      console.error("[bsearch-hint] Error:", e);
    }
  });
}
