import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

/**
 * This is the component that actually loads and renders your 3D model.
 * It uses the useGLTF hook from 'drei' to load your file from "/model.gltf"
 */
function Model() {
  // This hook loads your model from the /public folder.
  // This path works because the file is in health/public/model.gltf
  const { scene } = useGLTF("/model.gltf");

  // 'primitive' renders the entire model scene
  return <primitive object={scene} />;
}

/**
 * This is the main Canvas component that sets up the 3D scene.
 */
const CanvasViewer = () => {
  // We won't use the 'mode' or 'exercise' props for this simple viewer,
  // but you can use them later to change camera angles or highlight body parts.

  return (
    <div className='w-full h-96 bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing'>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        {" "}
        {/* Set initial camera position */}
        {/* Add some basic lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        {/* This component wraps your model and shows a "Loading..." message */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        {/* This adds mouse controls (orbit, zoom, pan) */}
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
};

// This line pre-loads the model so it appears faster.
useGLTF.preload("/model.gltf");

export default CanvasViewer;
