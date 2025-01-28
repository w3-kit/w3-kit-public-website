import React from "react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Coming Soon
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        This section is currently under development. Check back soon for updates!
      </p>
    </div>
  );
}