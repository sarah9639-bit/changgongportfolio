'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
  agreement: boolean;
}

export default function Contact() {
  const formRef = useRef(null);
  const isInView = useInView(formRef, {
    margin: "-100px",
    amount: 0.3
  });

  const { register, handleSubmit, reset, formState: { isSubmitting, errors }, setValue, watch } = useForm<ContactForm>();
  const [isSuccess, setIsSuccess] = useState(false);

  // 전화번호 자동 포맷팅
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '');
    
    // 숫자 그룹으로 나누기
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  // 전화번호 입력 처리
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // 숫자와 하이픈만 허용
    value = value.replace(/[^\d-]/g, '');
    
    // 하이픈 자동 추가
    const formattedValue = formatPhoneNumber(value);
    
    // 최대 13자리로 제한 (010-1234-5678 형식)
    if (formattedValue.length <= 13) {
      setValue('phone', formattedValue);
    }
  };

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('메시지 전송에 실패했습니다');
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 실시간으로 전화번호 값 감시
  const phoneValue = watch('phone');

  return (
    <section id="contact" className="py-20 bg-[#020617]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          문의하기
        </motion.h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  이름
                </label>
                <input
                  {...register('name', { required: '이름을 입력해주세요' })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="이름을 입력해주세요"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  연락처
                </label>
                <input
                  {...register('phone', {
                    required: '연락처를 입력해주세요',
                    pattern: {
                      value: /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/,
                      message: '올바른 연락처 형식이 아닙니다 (예: 010-1234-5678)'
                    }
                  })}
                  type="tel"
                  id="phone"
                  value={phoneValue || ''}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-600'
                  } text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="숫자만 입력해주세요 (예: 010-1234-5678)"
                  maxLength={13}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  이메일
                </label>
                <input
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: '올바른 이메일 형식이 아닙니다 (예: example@email.com)'
                    }
                  })}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="이메일을 입력해주세요 (예: example@email.com)"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  문의내용
                </label>
                <textarea
                  {...register('message', { required: '문의내용을 입력해주세요' })}
                  id="message"
                  rows={6}
                  className={`w-full px-4 py-3 bg-[#2a2a2a] rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-600'
                  } text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                  placeholder="문의하실 내용을 입력해주세요"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('agreement', { required: '개인정보 수집 및 활용에 동의해주세요' })}
                    type="checkbox"
                    id="agreement"
                    className={`w-4 h-4 bg-[#2a2a2a] border-gray-600 rounded text-blue-500 focus:ring-blue-500 ${
                      errors.agreement ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <label htmlFor="agreement" className="ml-2 text-sm text-gray-300">
                  개인정보 수집 및 활용에 동의합니다
                </label>
              </div>
              {errors.agreement && (
                <p className="text-red-500 text-sm mt-1">{errors.agreement.message}</p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                작성
              </motion.button>

              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-center mt-4"
                >
                  문의가 성공적으로 전송되었습니다!
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">소셜 미디어에서도 만나요</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.youtube.com/@YeeunRho-nc4lp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1a1a1a] rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://www.cglabor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1a1a1a] rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </a>
                <a
                  href="https://blog.naver.com/kei04121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1a1a1a] rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4C2.89 3 2 3.89 2 5V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V5C22 3.89 21.11 3 20 3ZM4 19V5H20V19H4ZM6 7H18V9H6V7ZM6 11H18V13H6V11ZM6 15H14V17H6V15Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 