"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";

function ConceptTower() {
  const floors = useMemo(() => Array.from({ length: 12 }, (_, index) => index), []);
  return (
    <group>
      {floors.map((index) => (
        <mesh key={index} position={[0, index * 0.58 - 3.3, 0]}>
          <boxGeometry args={[3.8, 0.42, 3.2]} />
          <meshStandardMaterial color={index % 3 === 0 ? "#37c27f" : "#153a6f"} metalness={0.35} roughness={0.58} />
        </mesh>
      ))}
    </group>
  );
}

export default function ConceptScene() {
  return (
    <Canvas camera={{ position: [8, 6, 11], fov: 38 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#071220"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 6]} intensity={2.4} />
      <ConceptTower />
      <OrbitControls enablePan={false} minDistance={8} maxDistance={18} />
    </Canvas>
  );
}
