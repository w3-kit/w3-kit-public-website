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
    <div className={`${className} w-full lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)]`}>
      <div className="h-full py-6">
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