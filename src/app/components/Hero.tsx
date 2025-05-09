'use client';

import { motion } from 'framer-motion';
import { FadeInWhenVisible, SlideIn, ScaleIn } from './animations';
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText = ({ text, delay = 0 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeNextCharacter, 100);
      }
    };
    
    timeout = setTimeout(() => {
      typeNextCharacter();
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return <span>{displayText}</span>;
};

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-gray-50 dark:bg-[#1c1c1c]">
      <div className="container mx-auto px-4 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-8"
          >
            <SlideIn direction="up">
              <h3 className="text-base md:text-lg text-blue-600 dark:text-blue-400 tracking-wider uppercase font-medium">
                <TypewriterText text="Frontend Developer" delay={500} />
              </h3>
            </SlideIn>
            
            <div className="space-y-4">
              <SlideIn direction="up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  <TypewriterText text="Hi, I'm " delay={1000} />
                  <span className="text-blue-600 dark:text-blue-400">
                    <TypewriterText text="John Doe" delay={1500} />
                  </span>
                </h1>
              </SlideIn>
              
              <FadeInWhenVisible>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  <TypewriterText 
                    text="I build beautiful and responsive web applications with modern technologies."
                    delay={2000}
                  />
                </p>
              </FadeInWhenVisible>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { delay: 0.6 } }
              }}
            >
              <motion.a 
                href="#projects"
                className="relative px-8 py-4 text-white rounded-full text-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-500 group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-500" />
                <span className="relative">유튜브</span>
              </motion.a>
              
              <motion.a 
                href="#contact"
                className="relative px-8 py-4 text-white rounded-full text-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500" />
                <span className="relative">홈페이지</span>
              </motion.a>

              <motion.a 
                href="#contact"
                className="relative px-8 py-4 text-white rounded-full text-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-600 to-green-500 group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-600 to-green-500" />
                <span className="relative">블로그</span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          <ScaleIn className="relative hidden md:block">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#1c1c1c] to-transparent" />
            </div>
            {/* Decorative dots */}
            <div className="absolute top-0 right-0 w-full h-full">
              <div className="w-full h-full opacity-30">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    style={{
                      top: `${(i + 1) * 10}%`,
                      right: `${(i * 5 + 20)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
} 