'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface WorkCardProps {
  title: string;
  items: string[];
  delay: number;
}

const WorkCard = ({ title, items, delay }: WorkCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    margin: "-100px",
    amount: 0.3 // Trigger animation when 30% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
      className="bg-[#1a1a1a] p-8 rounded-lg border border-[#333] transform transition-all hover:scale-105 hover:shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4 text-blue-400">{title}</h3>
      <ul className="space-y-2 text-gray-300">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function Work() {
  const workAreas = [
    {
      title: '노무 컨설팅',
      items: [
        '인사노무관리 체계 구축',
        '임금/근로시간 체계 개선',
        '노무관리 진단 및 자문',
        '인사규정 제/개정'
      ]
    },
    {
      title: '노동법률자문',
      items: [
        '근로계약서 검토',
        '노동관계법령 자문',
        '노동부 대응',
        '노동사건 대리'
      ]
    },
    {
      title: '교육 서비스',
      items: [
        '인사노무 관리자 교육',
        '법정의무교육 진행',
        '산업안전보건교육',
        '직장 내 괴롭힘 예방교육'
      ]
    }
  ];

  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, {
    margin: "-100px",
    amount: 0.3
  });

  return (
    <section id="work" className="py-20 bg-[#020617]">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          업무분야
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workAreas.map((area, index) => (
            <WorkCard
              key={area.title}
              title={area.title}
              items={area.items}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 