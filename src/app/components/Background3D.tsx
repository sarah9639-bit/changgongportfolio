'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import { useState, useRef, Suspense, useEffect } from 'react';
import { Points as PointsImpl } from 'three';
import type { ComponentPropsWithoutRef } from 'react';

type StarsProps = ComponentPropsWithoutRef<typeof Points>;

function Stars(props: StarsProps) {
  const ref = useRef<PointsImpl>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

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
}

export default function Background3D() {
  return null;
} 