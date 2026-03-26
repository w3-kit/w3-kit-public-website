import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "MCP Server - AI Integration",
  description:
    "Connect AI coding assistants like Claude Code and Cursor to w3-kit via the Model Context Protocol. Get component metadata, design tokens, and guidelines directly in your AI workflow.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "MCP Server - AI Integration",
    description:
      "Connect AI coding assistants to w3-kit via the Model Context Protocol.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit MCP Server - AI Integration",
      },
    ],
  },
};

export default function McpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/mcp" />
      {children}
    </>
  );
}
