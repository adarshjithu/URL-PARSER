import React from 'react'
import { Globe, Search, Home } from 'lucide-react'

export default function PageNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white dark:bg-gray-800 shadow-sm">
        <a href="/" className="flex items-center justify-center">
          <Globe className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-purple-600 dark:text-purple-400" />
          <span className="font-bold text-lg sm:text-xl text-purple-600 dark:text-purple-400">URL Wizard</span>
        </a>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              404 - Page Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Oops! It seems the magical page you're looking for has vanished.
            </p>
            <p className="text-md text-gray-500 dark:text-gray-400">
              Don't worry, even the best wizards lose a spell or two sometimes. Let's get you back on track!
            </p>
          </div>
          <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
            <Home className="w-5 h-5 mr-2" />
            Return to Homepage
          </button>
        </div>
      </main>
      <footer className="py-4 sm:py-6 px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-inner">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            © 2024 URL Wizard. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-xs sm:text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#privacy">
              Privacy Spell
            </a>
            <a className="text-xs sm:text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors" href="#terms">
              Terms of Wizardry
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}