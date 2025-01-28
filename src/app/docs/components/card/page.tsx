import React from 'react'

export default function CardPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Card</h1>
      
      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Cards are used to group and display content in a way that is easily readable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Usage</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">
            {`import { Card } from 'your-ui-library'
            
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content goes here</Card.Body>
</Card>`}
          </code>
        </pre>
      </section>
    </div>
  )
} 