import React from "react";
import Link from "next/link";

interface RightSidebarProps {
  className?: string;
}

const links = [
  {
    title: "On This Page",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Installation", href: "#installation" },
      { title: "Usage", href: "#usage" },
    ],
  },
  {
    title: "More",
    items: [
      { title: "API Reference", href: "/docs/api" },
      { title: "Examples", href: "/docs/examples" },
      { title: "GitHub", href: "https://github.com/w3-kit/w3-kit" },
    ],
  },
];

export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <div className={`fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-l border-gray-200 dark:border-gray-800 md:sticky md:block`}>
      <div className="h-full py-6 px-4">
        {links.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 