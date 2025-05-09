'use client';

import { useState, FormEvent, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// 로딩 컴포넌트 추가
const LoadingFallback = () => (
  <div className="w-full py-20 bg-[#020617] flex justify-center items-center">
    <div className="text-white text-xl">문의하기 로딩 중...</div>
  </div>
);

export default function Contact() {
  const [isClient, setIsClient] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  
  // 애니메이션을 위한 상태 추가
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSocialVisible, setIsSocialVisible] = useState(false);
  
  // 애니메이션 키를 추가하여 매번 새로운 애니메이션이 실행되도록 함
  const [titleKey, setTitleKey] = useState(0);
  const [formKey, setFormKey] = useState(0);
  const [socialKey, setSocialKey] = useState(0);
  
  // ref 객체 생성
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // 클라이언트 사이드에서만 렌더링되도록 처리
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 타이틀 관찰자 콜백
  const titleObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsTitleVisible(true);
      setTitleKey(prev => prev + 1); // 요소가 보일 때마다 키 증가
    } else {
      setIsTitleVisible(false);
    }
  }, []);

  // 폼 관찰자 콜백
  const formObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsFormVisible(true);
      setFormKey(prev => prev + 1); // 요소가 보일 때마다 키 증가
    } else {
      setIsFormVisible(false);
    }
  }, []);

  // 소셜 미디어 관찰자 콜백
  const socialObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsSocialVisible(true);
      setSocialKey(prev => prev + 1); // 요소가 보일 때마다 키 증가
    } else {
      setIsSocialVisible(false);
    }
  }, []);

  // IntersectionObserver 인스턴스 생성
  const { observe: observeTitle, unobserve: unobserveTitle } = useIntersectionObserver(
    titleObserverCallback,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }
  );

  const { observe: observeForm, unobserve: unobserveForm } = useIntersectionObserver(
    formObserverCallback,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
  );

  const { observe: observeSocial, unobserve: unobserveSocial } = useIntersectionObserver(
    socialObserverCallback,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }
  );

  // 타이틀 관찰자 설정
  useEffect(() => {
    // 서버 환경에서는 IntersectionObserver가 존재하지 않으므로 확인
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      observeTitle(currentTitleRef);
    }
    
    return () => {
      if (currentTitleRef) {
        unobserveTitle(currentTitleRef);
      }
    };
  }, [observeTitle, unobserveTitle]);

  // 폼 관찰자 설정
  useEffect(() => {
    // 서버 환경에서는 IntersectionObserver가 존재하지 않으므로 확인
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const currentFormRef = formRef.current;
    if (currentFormRef) {
      observeForm(currentFormRef);
    }
    
    return () => {
      if (currentFormRef) {
        unobserveForm(currentFormRef);
      }
    };
  }, [observeForm, unobserveForm]);

  // 소셜 미디어 관찰자 설정
  useEffect(() => {
    // 서버 환경에서는 IntersectionObserver가 존재하지 않으므로 확인
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const currentSocialRef = socialRef.current;
    if (currentSocialRef) {
      observeSocial(currentSocialRef);
    }
    
    return () => {
      if (currentSocialRef) {
        unobserveSocial(currentSocialRef);
      }
    };
  }, [observeSocial, unobserveSocial]);

  // 연락처 입력 처리 - 숫자와 하이픈만 허용
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자와 하이픈만 허용하는 정규식
    const regex = /^[0-9-]*$/;
    
    if (regex.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      setSubmitResult({
        success: false,
        message: '개인정보 수집 및 활용에 동의해주세요.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitResult(null);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          agreement: agreed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true, 
          message: data.message || '문의가 성공적으로 전송되었습니다.'
        });
        
        // 폼 초기화
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setAgreed(false);
      } else {
        throw new Error(data.error || '메시지 전송 실패');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitResult({
        success: false,
        message: '전송 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 애니메이션 변형(variants) 정의
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut" 
      }
    },
    exit: {
      opacity: 0,
      x: -15,
      transition: {
        duration: 0.3
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: 15,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        delay: 0.3 + (i * 0.1),
        ease: "easeOut"
      }
    }),
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // 클라이언트 사이드가 아니면 로딩 컴포넌트 표시
  if (!isClient) return <LoadingFallback />;

  return (
    <section id="contact" className="py-20 bg-[#020617] relative z-10">
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="mx-auto max-w-[2000px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div ref={titleRef}>
                <AnimatePresence mode="wait">
                  {isTitleVisible && (
                    <motion.h2 
                      key={titleKey} // 키 값이 변경될 때마다 컴포넌트가 재생성됨
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={titleVariants}
                      className="text-3xl md:text-4xl font-bold text-white mb-8"
                    >
                      문의하기
                    </motion.h2>
                  )}
                </AnimatePresence>
              </div>

              {submitResult && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-800' : 'bg-red-800'}`}
                >
                  <p className="text-white">{submitResult.message}</p>
                </motion.div>
              )}

              <div ref={formRef}>
                <AnimatePresence mode="wait">
                  {isFormVisible && (
                    <motion.form
                      key={formKey} // 키 값이 변경될 때마다 컴포넌트가 재생성됨
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={formVariants}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-lg font-semibold text-white mb-2">
                          이름
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="이름을 입력해주세요"
                          className="p-4 rounded-lg border border-[#333333] bg-[#1a1a1a] text-white w-full"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="phone" className="text-lg font-semibold text-white mb-2">
                          연락처
                        </label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="숫자만 입력해주세요 (예: 010-1234-5678)"
                          className="p-4 rounded-lg border border-[#333333] bg-[#1a1a1a] text-white w-full"
                          value={phone}
                          onChange={handlePhoneChange}
                          inputMode="numeric"
                          pattern="[0-9-]*"
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-semibold text-white mb-2">
                          이메일
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="이메일을 입력해주세요 (예: example@email.com)"
                          className="p-4 rounded-lg border border-[#333333] bg-[#1a1a1a] text-white w-full"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="message" className="text-lg font-semibold text-white mb-2">
                          문의내용
                        </label>
                        <textarea
                          id="message"
                          placeholder="문의 내용을 입력해주세요"
                          className="p-4 rounded-lg border border-[#333333] bg-[#1a1a1a] text-white h-40 w-full"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="agreement"
                          checked={agreed}
                          onChange={() => setAgreed(!agreed)}
                          className="w-5 h-5 rounded text-blue-600"
                        />
                        <label htmlFor="agreement" className="text-white">
                          개인정보 수집 및 활용에 동의합니다
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`w-full py-4 text-white font-bold rounded-lg transition-colors duration-200 ${
                          agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                        }`}
                        disabled={!agreed || isSubmitting}
                      >
                        {isSubmitting ? '제출 중...' : '작성'}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div ref={socialRef} className="lg:col-span-2 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isSocialVisible && (
                  <motion.div
                    key={socialKey} // 키 값이 변경될 때마다 컴포넌트가 재생성됨
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={socialVariants}
                  >
                    <motion.h3 
                      variants={titleVariants}
                      className="text-xl md:text-2xl text-white font-bold mb-8 md:mb-12 text-center"
                    >
                      소셜 미디어에서도 만나요
                    </motion.h3>
                    <div className="flex justify-center space-x-6 md:space-x-8">
                      <motion.a 
                        custom={0}
                        variants={iconVariants}
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1a1a1a] rounded-full p-4 hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                        whileHover={{ scale: 1.15, backgroundColor: '#2a2a2a' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        custom={1}
                        variants={iconVariants}
                        href="https://www.cglabor.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1a1a1a] rounded-full p-4 hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                        whileHover={{ scale: 1.15, backgroundColor: '#2a2a2a' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        custom={2}
                        variants={iconVariants}
                        href="https://blog.naver.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1a1a1a] rounded-full p-4 hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                        whileHover={{ scale: 1.15, backgroundColor: '#2a2a2a' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 