import React, { Suspense, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Bounds, OrbitControls } from "@react-three/drei";

// Load and render the GLTF model
function Model({ path }) {
  const { scene } = useGLTF(path);
  return (
    <group scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Track camera rotation to switch front/back view
function ViewTracker({ setView }) {
  const { camera } = useThree();

  useFrame(() => {
    const angle = Math.atan2(camera.position.x, camera.position.z);
    const normalized = angle % (2 * Math.PI);

    if (Math.abs(normalized) < 0.3) {
      setView("front");
    } else if (Math.abs(Math.abs(normalized) - Math.PI) < 0.3) {
      setView("back");
    }
  });

  return (
    <OrbitControls
      enableZoom={true}
      enablePan={false}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
      target={[0, 1, 0]}
    />
  );
}

// Reusable button component
function BodyPartButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className='bg-red-600 text-white font-bold px-6 py-2 shadow-md rounded w-40'
    >
      {label}
    </button>
  );
}

// Main component
export default function Body() {
  const [view, setView] = useState("front");

  const handleBodyPartClick = (part) => {
    alert(`Selected: ${part}`);
  };

  return (
    <div className='w-full h-screen pt-16 flex flex-col items-center justify-center'>
      {/* 3D MODEL VIEWER */}
      <div className='w-[400px] h-[500px] border rounded-xl shadow-lg flex items-center justify-center'>
        <Canvas
          style={{ background: "white" }}
          camera={{ position: [0, 2, 6], fov: 45 }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.6}>
              <Model path='/model.gltf' />
            </Bounds>
          </Suspense>

          <ViewTracker setView={setView} />
        </Canvas>
      </div>

      {/* FRONT VIEW BUTTONS */}
      {view === "front" && (
        <div className='flex flex-col items-center space-y-4 mt-6'>
          <BodyPartButton
            label='Chest'
            onClick={() => handleBodyPartClick("Chest - Bench Press, Push-Ups")}
          />
          <BodyPartButton
            label='Abs'
            onClick={() => handleBodyPartClick("Abs - Crunches, Plank")}
          />
          <BodyPartButton
            label='Quads'
            onClick={() => handleBodyPartClick("Quads - Squats, Lunges")}
          />
        </div>
      )}

      {/* BACK VIEW BUTTONS */}
      {view === "back" && (
        <div className='flex flex-col items-center space-y-4 mt-6'>
          <BodyPartButton
            label='Head'
            onClick={() => handleBodyPartClick("Head - Neck stretches")}
          />
          <BodyPartButton
            label='Back'
            onClick={() => handleBodyPartClick("Back - Pull-ups, Rows")}
          />
          <BodyPartButton
            label='Glutes'
            onClick={() =>
              handleBodyPartClick("Glutes - Hip Thrusts, Glute Bridge")
            }
          />
        </div>
      )}
    </div>
  );
}
