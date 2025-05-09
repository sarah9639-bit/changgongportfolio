'use client';

// import { Canvas, useFrame } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
// import { useState, useRef, Suspense, useEffect } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Points as PointsImpl } from 'three';
import type { ComponentPropsWithoutRef } from 'react';

type StarsProps = ComponentPropsWithoutRef<typeof Points>;

// Stars 컴포넌트는 현재 사용되지 않지만 향후 사용할 수 있으므로 주석 처리
// function Stars(props: StarsProps) {
const Stars = (props: StarsProps) => {
  const ref = useRef<PointsImpl>(null);
  // isMobile 변수가 실제로 사용되게 수정
  const [isMobile, setIsMobile] = useState(false);
  const [sphere] = useState(() => random.inSphere(new Float32Array(isMobile ? 2500 : 5000), { radius: 1.5 }));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={new Float32Array(sphere)} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default function Background3D() {
  // Note: 이 컴포넌트는 현재 사용되지 않거나 개발 중입니다.
  // Three.js 배경을 사용하려면 아래 코드를 주석 해제하세요.
  // return (
  //   <Canvas camera={{ position: [0, 0, 1] }}>
  //     <Suspense fallback={null}>
  //       <Stars />
  //     </Suspense>
  //   </Canvas>
  // );
  return null;
} 