'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-[#1c1c1c]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative aspect-square rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder-profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Frontend Developer & UI/UX Enthusiast
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              With over 5 years of experience in web development, I specialize in creating 
              user-friendly and performant web applications. My expertise includes React, 
              Next.js, and modern frontend technologies.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Email:</span>
                <span className="text-gray-600 dark:text-gray-400">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Location:</span>
                <span className="text-gray-600 dark:text-gray-400">Seoul, South Korea</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Experience:</span>
                <span className="text-gray-600 dark:text-gray-400">5+ Years</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full transition-all hover:opacity-90 hover:transform hover:scale-105"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 