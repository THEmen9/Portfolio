// components/Footer.jsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white px-4 py-4 mt-8 
      border-t border-gray-200 dark:border-gray-700 text-sm text-center">
      <p>© 2026 Ankit. All rights reserved.</p>
      <div className="mt-2 flex justify-center gap-4">
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          GitHub
        </a>

        <a
          href="https://linkedin.com/in/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}