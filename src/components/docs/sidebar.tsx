import React from 'react'
import Link from 'next/link'

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
    items: [
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Card', href: '/docs/components/card' },
    ]
  }
]

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 space-y-8 sticky top-16 h-[calc(100vh-4rem)]">
      {sidebarItems.map((section) => (
        <div key={section.section}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{section.section}</h3>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 block py-1"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
} 