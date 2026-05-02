'use client';

import React, { useState, useRef, Suspense } from 'react';
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

const TERMINAL_GREEN = "#4ade80";
const TERMINAL_DARK = "#050505";

function Node({ position, name, texturePath, color = TERMINAL_GREEN }: { position: [number, number, number], name: string, texturePath?: string, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        {/* Node Base */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2.5, 2.5, 0.5]} />
          <meshStandardMaterial 
            color={TERMINAL_DARK} 
            metalness={0.9} 
            roughness={0.1} 
            emissive={hovered ? color : "#000"} 
            emissiveIntensity={hovered ? 0.8 : 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Wireframe overlay */}
        <mesh>
          <boxGeometry args={[2.55, 2.55, 0.55]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Bold.ttf"
        >
          {`[ ${name.toUpperCase()} ]`}
        </Text>
      </group>
    </Float>
  );
}

function DataFlow({ start, end, color = TERMINAL_GREEN }: { start: [number, number, number], end: [number, number, number], color?: string }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const curve = new THREE.CatmullRomCurve3(points);
  const linePoints = curve.getPoints(50);
  
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (particleRef.current) {
      const t = (state.clock.getElapsedTime() * 0.3) % 1;
      const pos = curve.getPointAt(t);
      particleRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      <primitive object={new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePoints),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })
      )} />
      <mesh ref={particleRef}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function MaintenanceCrew({ position, label }: { position: [number, number, number], label: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [target, setTarget] = useState(new THREE.Vector3(...position));

  useFrame((state) => {
    if (groupRef.current) {
      if (groupRef.current.position.distanceTo(target) < 0.1) {
        setTarget(new THREE.Vector3(
          position[0] + (Math.random() * 8 - 4),
          position[1],
          position[2] + (Math.random() * 8 - 4)
        ));
      }
      groupRef.current.position.lerp(target, 0.003);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html distanceFactor={15}>
        <div className="flex flex-col items-center pointer-events-none select-none font-mono">
          <div className="text-accent text-xs animate-pulse font-bold bg-black/80 px-2 py-0.5 border border-accent/30">
            {`RUNNING: ${label}`}
          </div>
          <div className="w-px h-4 bg-accent/30"></div>
        </div>
      </Html>
    </group>
  );
}

export default function InfraPlayground() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col font-mono overflow-hidden">
      {/* Terminal UI Overlay */}
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-accent/30 bg-black flex items-center justify-between px-4 z-[110]">
        <div className="flex items-center gap-4">
          <span className="text-accent font-bold animate-pulse">● LIVE_SIMULATION</span>
          <span className="text-accent/40 text-xs uppercase tracking-widest hidden md:block">
            Project Laboratory // Infra-as-Code Visualizer
          </span>
        </div>
        <button 
          onClick={() => setMode('home')}
          className="text-xs bg-accent text-black px-4 py-1 font-bold hover:bg-white transition-colors"
        >
          SIGINT [EXIT]
        </button>
      </div>

      <div className="absolute top-16 left-8 z-[110] pointer-events-none max-w-xs">
        <div className="terminal-window text-[10px] space-y-1">
          <p className="text-accent">VERSION: 4.0.0-PROD</p>
          <p className="text-accent">ENVIRONMENT: MULTI-REGIONAL</p>
          <p className="text-accent">STATUS: NOMINAL</p>
          <div className="h-px bg-accent/20 my-2"></div>
          <p className="text-accent/50 leading-relaxed uppercase">
            Interactive view of high-availability infrastructure deployments. 
            Rotate to inspect node connectivity and traffic flow.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full h-full cursor-crosshair">
        <Canvas shadows gl={{ antialias: true }} camera={{ position: [15, 15, 15], fov: 40 }}>
          <color attach="background" args={[TERMINAL_DARK]} />
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} minDistance={5} maxDistance={40} />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[15, 15, 15]} intensity={1.5} color={TERMINAL_GREEN} />
          <pointLight position={[-15, 10, -15]} intensity={0.5} color="#22c55e" />
          
          <Suspense fallback={<Html center><div className="text-accent font-mono animate-pulse uppercase tracking-widest text-sm">Mounting Filesystems...</div></Html>}>
            {/* The Map Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#020202" roughness={0.8} metalness={0.1} />
            </mesh>
            <gridHelper args={[100, 50, "#4ade8020", "#4ade8005"]} position={[0, -0.05, 0]} />

            {/* Infrastructure Nodes */}
            <Node position={[-12, 1, -5]} name="Route 53" />
            <Node position={[-4, 1, 0]} name="VPC / ALB" />
            <Node position={[6, 2, -4]} name="EKS Cluster" />
            <Node position={[6, 2, 4]} name="EC2 Nodes" />
            <Node position={[16, 1, 0]} name="RDS Master" />

            {/* Flows */}
            <DataFlow start={[-12, 1, -5]} end={[-4, 1, 0]} />
            <DataFlow start={[-4, 1, 0]} end={[6, 2, -4]} />
            <DataFlow start={[-4, 1, 0]} end={[6, 2, 4]} />
            <DataFlow start={[6, 2, -4]} end={[16, 1, 0]} />
            <DataFlow start={[6, 2, 4]} end={[16, 1, 0]} />

            {/* Maintenance Bots (Represented as labels) */}
            <MaintenanceCrew position={[5, 0, 2]} label="CLEANUP_JOB" />
            <MaintenanceCrew position={[10, 0, 10]} label="HEALTH_CHECK" />
            <MaintenanceCrew position={[-8, 0, -5]} label="CERT_RENEW" />

            <ContactShadows position={[0, -0.05, 0]} opacity={0.4} scale={40} blur={2.5} far={10} color="#000" />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-[110] flex justify-between text-[10px] font-mono text-accent/30 pointer-events-none uppercase tracking-[0.3em]">
        <span>SYS_COORD: 40.7128° N, 74.0060° W</span>
        <span>LATENCY: 12MS</span>
        <span>UPTIME: 99.99%</span>
      </div>
    </div>
  );
}
