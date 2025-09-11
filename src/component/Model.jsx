import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Model({ path, blinkPart }) {
  const group = useRef();
  const { scene } = useGLTF(path);
  const blinkState = useRef(false);

  useEffect(() => {
    // Reset materials when model loads
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set("#ffffff");
      }
    });
  }, [scene]);

  useFrame(() => {
    if (blinkPart && group.current) {
      const part = group.current.getObjectByName(blinkPart);
      if (part && part.material) {
        blinkState.current = !blinkState.current;
        part.material.color.set(blinkState.current ? "red" : "white");
      }
    }
  });

  return (
    <group ref={group} scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}
