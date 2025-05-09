'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#020617]/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-[#8C9EFF] text-2xl font-semibold">
            노예은 노무사
          </a>
          <div className="flex gap-8">
            <a
              href="#intro"
              className="text-gray-300 hover:text-white transition-colors"
            >
              소개
            </a>
            <a
              href="#services"
              className="text-gray-300 hover:text-white transition-colors"
            >
              업무분야
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 