import { generateComponentOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return generateComponentOgImage({
    name: "Liquidity Pool Stats",
    description: "Display liquidity pool statistics and performance metrics.",
    category: "DeFi",
  });
}
