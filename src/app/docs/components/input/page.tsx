import React from 'react'

export default function InputPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Input</h1>
      
      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Input components for collecting user data with various styles and validations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Usage</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">
            {`import { Input } from 'your-ui-library'
            
<Input placeholder="Enter your name" />`}
          </code>
        </pre>
      </section>
    </div>
  )
} 