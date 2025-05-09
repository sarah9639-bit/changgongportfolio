'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Services() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-100px",
    amount: 0.3
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-20 bg-[#020617]"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          업무분야
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: '노무 컨설팅',
              description: '기업의 인사노무관리 전반에 대한 컨설팅을 제공합니다.',
              icon: '📊'
            },
            {
              title: '노동법 자문',
              description: '근로기준법, 노동관계법령 등에 대한 법률자문을 제공합니다.',
              icon: '⚖️'
            },
            {
              title: '인사제도 설계',
              description: '임금체계, 평가제도, 취업규칙 등 인사제도를 설계합니다.',
              icon: '📝'
            },
            {
              title: '교육',
              description: '인사노무 실무, 노동법 등 맞춤형 교육을 제공합니다.',
              icon: '🎓'
            },
            {
              title: '노사관계 개선',
              description: '노사관계 진단 및 개선방안을 제시합니다.',
              icon: '🤝'
            },
            {
              title: '분쟁해결 지원',
              description: '노동분쟁 발생 시 해결을 위한 자문을 제공합니다.',
              icon: '🔨'
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1a1a1a] p-8 rounded-2xl hover:bg-[#2a2a2a] transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 