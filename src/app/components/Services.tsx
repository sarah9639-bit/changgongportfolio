'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// 클라이언트 측에서만 IntersectionObserver 사용하도록 래퍼 함수 추가
const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 서버 사이드 렌더링 중에는 window 객체가 없음
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    observer.current = new IntersectionObserver(callback, options);
    
    return () => {
      observer.current?.disconnect();
    };
  }, [callback, options]);

  // observe와 unobserve 함수 반환
  const observe = useCallback((element: Element | null) => {
    if (!element || !observer.current) return;
    observer.current.observe(element);
  }, []);

  const unobserve = useCallback((element: Element | null) => {
    if (!element || !observer.current) return;
    observer.current.unobserve(element);
  }, []);

  return { observe, unobserve };
};

// 개별 카드 컴포넌트
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 최적화: useCallback을 사용하여 observer 콜백 함수 메모이제이션
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting !== isVisible) {
      setIsVisible(entry.isIntersecting);
    }
  }, [isVisible]);

  // IntersectionObserver 사용
  const { observe, unobserve } = useIntersectionObserver(
    observerCallback,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 카드의 50% 이상이 보일 때만 애니메이션 시작
    }
  );

  // IntersectionObserver를 useEffect 내에서 생성
  useEffect(() => {
    // 서버 환경에서는 IntersectionObserver가 존재하지 않으므로 확인
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const currentRef = cardRef.current;
    if (currentRef) {
      observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        unobserve(currentRef);
      }
    };
  }, [observe, unobserve]);

  // 애니메이션 지연 계산: 화면에 많은 카드가 동시에 애니메이션되지 않도록
  const animationDelay = useMemo(() => 0.15 * (index % 2), [index]);

  return (
    <div ref={cardRef} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.4, 
          delay: animationDelay,
          ease: "easeOut" 
        }}
        whileHover={{ scale: 1.03, backgroundColor: '#2a2a2a' }}
        whileTap={{ scale: 0.97 }}
        className="bg-[#1a1a1a] p-6 sm:p-8 lg:p-10 rounded-lg border border-[#333333] mb-6 transform transition-all duration-300 hover:shadow-lg h-full"
      >
        <div className="flex items-center">
          <div className="text-4xl mr-4 flex-shrink-0">{icon}</div>
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-lg text-gray-400">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 로딩 컴포넌트 추가
const LoadingFallback = () => (
  <div className="w-full py-10 bg-[#020617] flex justify-center items-center">
    <div className="text-white text-xl">업무분야 로딩 중...</div>
  </div>
);

export default function Services() {
  const [isClient, setIsClient] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  // 클라이언트 사이드에서만 렌더링되도록 처리
  useEffect(() => {
    setIsClient(true);
  }, []);

  const titleObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting !== isTitleVisible) {
      setIsTitleVisible(entry.isIntersecting);
    }
  }, [isTitleVisible]);

  // IntersectionObserver 사용
  const { observe: observeTitle, unobserve: unobserveTitle } = useIntersectionObserver(
    titleObserverCallback,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
  );

  useEffect(() => {
    // 서버 환경에서는 IntersectionObserver가 존재하지 않으므로 확인
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const currentRef = titleRef.current;
    if (currentRef) {
      observeTitle(currentRef);
    }
    
    return () => {
      if (currentRef) {
        unobserveTitle(currentRef);
      }
    };
  }, [observeTitle, unobserveTitle]);

  // 최적화: 서비스 데이터를 useMemo로 메모이제이션
  const services = useMemo(() => [
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
  ], []);

  // 클라이언트 사이드가 아니면 로딩 컴포넌트 표시
  if (!isClient) return <LoadingFallback />;

  return (
    <section
      id="services"
      className="w-full py-10 bg-[#020617]"
    >
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="mx-auto max-w-[2000px]">
          <div ref={titleRef} className="mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white text-center"
            >
              업무분야
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 