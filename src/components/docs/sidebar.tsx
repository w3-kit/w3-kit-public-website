import React from 'react'
import Link from 'next/link'
import { getComponentList } from '@/config/docs'

const sidebarItems = [
  {
    section: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
    ]
  },
  {
    section: 'Components',
    items: getComponentList().map(component => ({
      title: component.title,
      href: component.href,
    }))
  }
]

export function Sidebar() {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800 md:sticky md:block">
      <div className="h-full py-6">
        {sidebarItems.map((section) => (
          <div key={section.section} className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              {section.section}
            </h3>
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
    </aside>
  )
} 