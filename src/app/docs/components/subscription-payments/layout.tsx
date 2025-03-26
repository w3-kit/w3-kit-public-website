import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Payments - Components | W3-Kit",
  description: "Learn about W3-Kit's Subscription Payments component for managing recurring crypto payments. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Subscription Payments - Components | W3-Kit",
    description: "Learn about W3-Kit's Subscription Payments component for managing recurring crypto payments.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function SubscriptionPaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 