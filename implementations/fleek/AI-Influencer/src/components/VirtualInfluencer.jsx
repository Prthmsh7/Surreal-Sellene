import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Simple placeholder avatar (sphere + cube)
function Avatar() {
  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4b0082" />
      </mesh>
    </group>
  );
}

export default function VirtualInfluencer() {
  return (
    <Canvas style={{ height: '400px', background: '#f0f0f0' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Avatar />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
