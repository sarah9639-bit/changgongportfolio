'use client';

import { motion, useInView } from 'framer-motion';
import React, { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

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
        const speed = text.charAt(currentIndex - 1)?.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/) ? 70 : 50;
        timeout = setTimeout(typeNextCharacter, speed);
      }
    };
    
    timeout = setTimeout(() => {
      typeNextCharacter();
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return <span>{displayText}</span>;
};

function WaveAnimation() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      setTime(state.clock.elapsedTime);
    }
  });

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
    }),
    []
  );

  const materialProps = {
    metalness: 0.2,
    roughness: 0.4,
    color: new THREE.Color('#0a1128').convertSRGBToLinear(),
    envMapIntensity: 2,
    transparent: true,
    opacity: 0.8,
  };

  return (
    <group position={[0, 0, 0]} scale={[2, 2, 2]}>
      <Sphere args={[1, 128, 128]} ref={meshRef}>
        <MeshDistortMaterial
          {...materialProps}
          distort={0.4}
          speed={2}
          time={time * 0.5}
        />
      </Sphere>
      <Sphere args={[1.2, 128, 128]} rotation={[Math.PI / 4, 0, 0]}>
        <MeshDistortMaterial
          {...materialProps}
          distort={0.6}
          speed={1.5}
          time={time * 0.3}
          color={new THREE.Color('#1e3a8a').convertSRGBToLinear()}
          opacity={0.4}
        />
      </Sphere>
    </group>
  );
}

const Scene = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e3a8a]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <WaveAnimation />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default function Intro() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-100px",
    amount: 0.3
  });

  const textContainerRef = useRef(null);
  const isTextInView = useInView(textContainerRef, {
    margin: "-100px",
    amount: 0.3
  });

  const imageContainerRef = useRef(null);
  const isImageInView = useInView(imageContainerRef, {
    margin: "-100px",
    amount: 0.3
  });

  return (
    <section 
      ref={containerRef}
      id="intro" 
      className="min-h-screen bg-[#020617] flex items-center relative overflow-hidden"
    >
      <Scene />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textContainerRef} className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-lg font-medium text-blue-400 tracking-wide"
            >
              노무법인 창공
            </motion.h2>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                안녕하세요,{" "}
                <span className="inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                    노예은 노무사
                  </span>
                  입니다
                </span>
              </motion.h1>

              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="text-lg md:text-xl text-gray-400 leading-relaxed"
                >
                  근로자와 사업주 모두를 위한
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="text-lg md:text-xl text-gray-400 leading-relaxed"
                >
                  전문적인 노무 컨설팅을 제공합니다.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                  className="text-lg md:text-xl text-gray-400 leading-relaxed"
                >
                  노사관계 개선과 합법적인 인사관리를 통해
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  className="text-lg md:text-xl text-gray-400 leading-relaxed"
                >
                  기업의 성장을 돕습니다.
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.a
                href="https://www.youtube.com/@YeeunRho-nc4lp"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#7DD3FC] to-[#93C5FD] hover:from-[#3B82F6] hover:via-[#60A5FA] hover:to-[#7DD3FC] transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="font-medium text-white">유튜브</span>
              </motion.a>

              <motion.a
                href="https://www.cglabor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD] hover:from-[#7C3AED] hover:via-[#8B5CF6] hover:to-[#A78BFA] transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span className="font-medium text-white">홈페이지</span>
              </motion.a>

              <motion.a
                href="https://blog.naver.com/kei04121"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#1F2937] via-[#374151] to-[#4B5563] hover:from-[#111827] hover:via-[#1F2937] hover:to-[#374151] transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 3H4C2.89 3 2 3.89 2 5V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V5C22 3.89 21.11 3 20 3ZM4 19V5H20V19H4ZM6 7H18V9H6V7ZM6 11H18V13H6V11ZM6 15H14V17H6V15Z"/>
                </svg>
                <span className="font-medium text-white">블로그</span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            ref={imageContainerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isImageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden md:block w-[500px]"
          >
            <div className="relative w-full pb-[133%] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="노예은 노무사 프로필"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover rounded-2xl"
                priority
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" 
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 