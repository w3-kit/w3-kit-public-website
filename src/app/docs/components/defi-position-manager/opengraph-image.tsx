import { generateComponentOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return generateComponentOgImage({
    name: "DeFi Position Manager",
    description: "Manage and monitor DeFi positions across protocols.",
    category: "DeFi",
  });
}
