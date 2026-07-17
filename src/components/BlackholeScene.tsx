"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";

function BlackholeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7.6], fov: 48 }} dpr={[1, 1.7]}>
      <color attach="background" args={["#020204"]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 5]} intensity={4.5} color="#f5f1e8" />
      <pointLight position={[-5, -2, 2]} intensity={2.4} color="#56f0c1" />
      <Stars radius={55} depth={36} count={1100} factor={2.4} fade speed={0.55} />
      <BlackholeField />
      <Environment preset="night" />
    </Canvas>
  );
}

function BlackholeField() {
  const group = useRef<any>(null);
  const particles = useRef<any>(null);
  const positions = useMemo(() => {
    const count = 1900;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const t = i / count;
      const ring = 0.9 + Math.pow(t, 0.58) * 5.7;
      const angle = i * 0.18 + Math.sin(i * 0.017) * 1.5;
      const arm = Math.sin(i * 0.09) * 0.32;
      data[i * 3] = Math.cos(angle) * (ring + arm);
      data[i * 3 + 1] = Math.sin(angle) * (ring * 0.3) + (Math.random() - 0.5) * 0.8;
      data[i * 3 + 2] = Math.sin(angle * 0.9) * 0.55 + (Math.random() - 0.5) * 1.2;
    }

    return data;
  }, []);

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = elapsed * 0.055;
      group.current.rotation.x = pointer.y * 0.12;
      group.current.rotation.y = pointer.x * 0.14;
    }
    if (particles.current) {
      particles.current.rotation.z = -elapsed * 0.025;
    }
  });

  return (
    <group ref={group}>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#f7f0df" transparent opacity={0.78} depthWrite={false} />
      </points>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.25}>
        <mesh>
          <sphereGeometry args={[0.78, 48, 48]} />
          <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh rotation={[1.31, 0.16, 0.12]}>
          <torusGeometry args={[1.72, 0.035, 16, 180]} />
          <meshStandardMaterial color="#f4d28b" emissive="#986c24" emissiveIntensity={1.4} />
        </mesh>
        <mesh rotation={[1.34, -0.14, 0.18]}>
          <torusGeometry args={[2.28, 0.018, 12, 180]} />
          <meshStandardMaterial color="#5de3c2" emissive="#156d5f" emissiveIntensity={1.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default BlackholeScene;
