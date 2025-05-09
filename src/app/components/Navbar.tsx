'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed w-full bg-white dark:bg-[#1c1c1c] transition-colors duration-300 shadow-sm backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-gray-800 dark:text-blue-400">Portfolio</a>
            
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col space-y-4 mt-4`}>
            <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">소개</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">업무분야</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">문의하기</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">소개</a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">업무분야</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">문의하기</a>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 