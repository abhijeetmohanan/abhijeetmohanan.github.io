'use client';

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  Float, 
  Environment, 
  ContactShadows,
  useTexture,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../store';

const K8S_IMAGE = "/k8s_3d_icon.png";
const AWS_IMAGE = "/aws_3d_icon.png";

function Node({ position, name, texturePath, color = "#38bdf8" }: { position: [number, number, number], name: string, texturePath?: string, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(texturePath || AWS_IMAGE);
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Node Base */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2.5, 2.5, 0.5]} />
          <meshStandardMaterial 
            color="#1e293b" 
            metalness={0.9} 
            roughness={0.1} 
            emissive={hovered ? color : "#000"} 
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Logo Plane */}
        {texture && (
          <mesh position={[0, 0, 0.26]}>
            <planeGeometry args={[1.8, 1.8]} />
            <meshBasicMaterial map={texture} transparent alphaTest={0.5} />
          </mesh>
        )}

        {/* Label */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.4}
          color={hovered ? color : "white"}
          anchorX="center"
          anchorY="middle"
        >
          {name.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
}

function DataFlow({ start, end, color = "#38bdf8" }: { start: [number, number, number], end: [number, number, number], color?: string }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const curve = new THREE.CatmullRomCurve3(points);
  const linePoints = curve.getPoints(50);
  
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.getElapsedTime() * 0.4) % 1;
      const pos = curve.getPointAt(t);
      particleRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePoints),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15 })
      )} />
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function MaintenanceCrew({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [target, setTarget] = useState(new THREE.Vector3(...position));

  useFrame((state) => {
    if (groupRef.current) {
      if (groupRef.current.position.distanceTo(target) < 0.1) {
        setTarget(new THREE.Vector3(
          position[0] + (Math.random() * 6 - 3),
          position[1],
          position[2] + (Math.random() * 6 - 3)
        ));
      }
      groupRef.current.position.lerp(target, 0.005);
      groupRef.current.rotation.y = Math.atan2(target.x - groupRef.current.position.x, target.z - groupRef.current.position.z);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html distanceFactor={15}>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">👷</div>
          <div className="bg-accent/40 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-white uppercase border border-white/20">
            Fixing_Node
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function InfraPlayground() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="fixed inset-0 z-[100] bg-[#02040a] flex flex-col">
      {/* UI Overlay */}
      <div className="absolute top-12 left-12 z-[110] pointer-events-none">
        <h1 className="text-5xl font-black italic text-accent tracking-tighter mb-2 drop-shadow-[0_0_20px_var(--accent-glow)]">INFRA_LAB_V4</h1>
        <p className="text-sm font-mono text-white/40 uppercase tracking-[0.4em]">
          Interactive 3D Deployment Map // High-Fidelity
        </p>
      </div>

      <button 
        onClick={() => setMode('experience')}
        className="absolute top-12 right-12 z-[110] px-8 py-4 bg-accent text-black rounded-full font-black text-xs uppercase hover:scale-105 transition-all shadow-[0_0_30px_var(--accent-glow)]"
      >
        [ EXIT_LAB ]
      </button>

      <div className="flex-1 w-full h-full">
        <Canvas shadows gl={{ antialias: true }} camera={{ position: [12, 12, 12], fov: 45 }}>
          <color attach="background" args={['#02040a']} />
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} minDistance={5} maxDistance={30} />
          
          <ambientLight intensity={1} />
          <directionalLight position={[15, 30, 15]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
          <pointLight position={[-15, 15, -5]} intensity={3} color="#38bdf8" />
          
          <Environment preset="night" />

          <Suspense fallback={<Html center><div className="text-accent font-mono animate-pulse uppercase tracking-widest">Initialising Laboratory...</div></Html>}>
            {/* The Map Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#050812" roughness={0.7} metalness={0.2} />
            </mesh>
            <gridHelper args={[100, 40, "#38bdf830", "#38bdf810"]} position={[0, -0.05, 0]} />

            {/* Infrastructure Nodes */}
            <Node position={[-12, 1, -5]} name="Route 53" texturePath={AWS_IMAGE} color="#f59e0b" />
            <Node position={[-4, 1, 0]} name="VPC / ALB" texturePath={AWS_IMAGE} color="#fbbf24" />
            <Node position={[6, 2, -4]} name="EKS Cluster" texturePath={K8S_IMAGE} color="#38bdf8" />
            <Node position={[6, 2, 4]} name="EC2 Nodes" texturePath={AWS_IMAGE} color="#f59e0b" />
            <Node position={[16, 1, 0]} name="RDS Master" texturePath={AWS_IMAGE} color="#f43f5e" />

            {/* Flows */}
            <DataFlow start={[-12, 1, -5]} end={[-4, 1, 0]} color="#fbbf24" />
            <DataFlow start={[-4, 1, 0]} end={[6, 2, -4]} color="#38bdf8" />
            <DataFlow start={[-4, 1, 0]} end={[6, 2, 4]} color="#f59e0b" />
            <DataFlow start={[6, 2, -4]} end={[16, 1, 0]} color="#38bdf8" />
            <DataFlow start={[6, 2, 4]} end={[16, 1, 0]} color="#f43f5e" />

            {/* Maintenance Crew */}
            <MaintenanceCrew position={[5, 0, 2]} />
            <MaintenanceCrew position={[10, 0, 10]} />
            <MaintenanceCrew position={[-8, 0, -5]} />

            <ContactShadows position={[0, -0.05, 0]} opacity={0.6} scale={40} blur={2.5} far={10} color="#000" />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-12 left-12 z-[110] text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] pointer-events-none">
        Simulation Live // Multi-Regional Environment Detected
      </div>
    </div>
  );
}
