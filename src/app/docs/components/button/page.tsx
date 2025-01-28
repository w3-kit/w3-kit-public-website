import React from "react";

import { getPageNavigation } from "@/config/docs";

export default function ButtonPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Button
      </h1>

      <section className="prose dark:prose-invert prose-slate max-w-none">
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Buttons allow users to trigger actions with a single click or tap.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
          Usage
        </h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <code className="text-gray-800 dark:text-gray-200">
            {`import { Button } from 'your-ui-library'
            
<Button variant="primary">Click me</Button>`}
          </code>
        </pre>
      </section>
    </div>
  );
}
