import { generateComponentOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return generateComponentOgImage({
    name: "Token Airdrop",
    description: "Distribute tokens to multiple recipients via airdrop campaigns.",
    category: "Token",
  });
}
