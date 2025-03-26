import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DeFi Position Manager - Components | W3-Kit",
  description: "Learn about W3-Kit's DeFi Position Manager component for managing decentralized finance positions. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "DeFi Position Manager - Components | W3-Kit",
    description: "Learn about W3-Kit's DeFi Position Manager component for managing decentralized finance positions.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
}; 

export default function DefiPositionManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 