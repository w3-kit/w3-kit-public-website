"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  return (
    <div className="flex items-center space-x-2 text-sm mb-6 text-gray-600 dark:text-gray-400">
      <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1
        const title = path.charAt(0).toUpperCase() + path.slice(1)
        
        return (
          <React.Fragment key={path}>
            <span>/</span>
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100">{title}</span>
            ) : (
              <Link href={href} className="hover:text-gray-900 dark:hover:text-gray-100">
                {title}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
} 