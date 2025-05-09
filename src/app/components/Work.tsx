'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface WorkCardProps {
  title: string;
  items: string[];
  delay: number;
}

const WorkCard = ({ title, items, delay }: WorkCardProps) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0); // 애니메이션을 강제로 재시작하기 위한 키
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when visibility changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          setKey(prev => prev + 1); // 요소가 화면에 들어올 때마다 키 변경
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '-100px',
        threshold: 0.3,
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
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
        )}
      </AnimatePresence>
    </div>
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
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [titleKey, setTitleKey] = useState(0);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
          setTitleKey(prev => prev + 1);
        } else {
          setIsTitleVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '-100px',
        threshold: 0.3,
      }
    );
    
    const currentRef = titleRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="work" className="py-20 bg-[#020617]">
      <div className="container mx-auto px-4">
        <div ref={titleRef}>
          <AnimatePresence mode="wait">
            {isTitleVisible && (
              <motion.h2
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white mb-12 text-center"
              >
                업무분야
              </motion.h2>
            )}
          </AnimatePresence>
        </div>
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