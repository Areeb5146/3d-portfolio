'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Shirt() {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Simplified shirt silhouette
    shape.moveTo(0, 2);
    shape.lineTo(-0.8, 1.6);
    shape.lineTo(-1.5, 2.2); // left sleeve
    shape.lineTo(-1.8, 1.5);
    shape.lineTo(-1.0, 1.0);
    shape.lineTo(-1.0, -1.5);
    shape.lineTo(-0.6, -2.0);
    shape.lineTo(0.6, -2.0);
    shape.lineTo(1.0, -1.5);
    shape.lineTo(1.0, 1.0);
    shape.lineTo(1.8, 1.5);
    shape.lineTo(1.5, 2.2); // right sleeve
    shape.lineTo(0.8, 1.6);
    shape.lineTo(0, 2);

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.4;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          color="#4fffb0"
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#4fffb0"
          wireframe
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function ShirtPreview() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -3, 2]} intensity={0.3} color="#4fffb0" />
      <Shirt />
    </Canvas>
  );
}
