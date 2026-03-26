import { generateComponentOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return generateComponentOgImage({
    name: "MCP Server",
    description: "Connect AI coding assistants to w3-kit via the Model Context Protocol.",
    category: "AI Integration",
  });
}
