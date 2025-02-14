import Link from 'next/link'
import { Home } from 'lucide-react'
import { BackButton } from '@/components/back-button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-lg">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-6">
          <BackButton />
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-800" />
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="mt-12 space-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Looking for something specific?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/docs" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Documentation
            </Link>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">•</span>
            <Link href="/docs/components" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Components
            </Link>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">•</span>
            <Link href="/docs/examples" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Examples
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 