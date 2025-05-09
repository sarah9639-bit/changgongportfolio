'use client';

import { useState, FormEvent } from 'react';

export default function Contact() {
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);

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

  return (
    <section id="contact" className="py-20 bg-[#020617] relative z-10">
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="mx-auto max-w-[2000px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                문의하기
              </h2>

              {submitResult && (
                <div className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-800' : 'bg-red-800'}`}>
                  <p className="text-white">{submitResult.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                  type="submit"
                  className={`w-full py-4 text-white font-bold rounded-lg transition-colors duration-200 ${
                    agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'
                  }`}
                  disabled={!agreed || isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '작성'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl text-white font-bold mb-8 md:mb-12 text-center">
                소셜 미디어에서도 만나요
              </h3>
              <div className="flex justify-center space-x-6 md:space-x-8">
                <a 
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] rounded-full p-4 hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.cglabor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] rounded-full p-4 hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </a>
                <a 
                  href="https://blog.naver.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] rounded-full p-4 hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 