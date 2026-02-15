import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 80, mousePosition }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const linesMesh = useRef<THREE.LineSegments>(null);
  
  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.005,
      });
    }
    
    return { positions, velocities };
  }, [count]);
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * count * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, [count]);
  
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: '#55BBE0',
      transparent: true,
      opacity: 0.15,
    });
  }, []);
  
  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particlesData.positions, 3));
    return geometry;
  }, [particlesData.positions]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const linePositions = lineGeometry.attributes.position.array as Float32Array;
    let lineIndex = 0;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update positions
      positions[i3] += particlesData.velocities[i].x;
      positions[i3 + 1] += particlesData.velocities[i].y;
      positions[i3 + 2] += particlesData.velocities[i].z;
      
      // Boundary check
      if (Math.abs(positions[i3]) > 10) particlesData.velocities[i].x *= -1;
      if (Math.abs(positions[i3 + 1]) > 10) particlesData.velocities[i].y *= -1;
      if (Math.abs(positions[i3 + 2]) > 5) particlesData.velocities[i].z *= -1;
      
      // Mouse repulsion
      const mouseX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;
      const dx = positions[i3] - mouseX * 10;
      const dy = positions[i3 + 1] - mouseY * 10;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) / 3;
        positions[i3] += dx * force * 0.02;
        positions[i3 + 1] += dy * force * 0.02;
      }
      
      // Draw connections
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 2.5 && lineIndex < count * count * 6 - 6) {
          linePositions[lineIndex++] = positions[i3];
          linePositions[lineIndex++] = positions[i3 + 1];
          linePositions[lineIndex++] = positions[i3 + 2];
          linePositions[lineIndex++] = positions[j3];
          linePositions[lineIndex++] = positions[j3 + 1];
          linePositions[lineIndex++] = positions[j3 + 2];
        }
      }
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    lineGeometry.setDrawRange(0, lineIndex / 3);
    lineGeometry.attributes.position.needsUpdate = true;
    
    // Gentle rotation
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    if (linesMesh.current) {
      linesMesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });
  
  return (
    <>
      <points ref={mesh} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.08}
          color="#55BBE0"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesMesh} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}

export default function ParticleField() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={80} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
