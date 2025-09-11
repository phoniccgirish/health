import React, { Suspense, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Bounds, OrbitControls } from "@react-three/drei";

// Model Component
function Model({ path }) {
  const { scene } = useGLTF(path);
  return (
    <group scale={[0.6, 0.6, 0.6]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// View Tracker Component
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

// Button Component
function BodyPartButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='bg-red-600 text-white font-bold px-6 py-2 shadow-md rounded w-40 disabled:opacity-50'
    >
      {label}
    </button>
  );
}

// Main Component
export default function Body1() {
  const [view, setView] = useState("front");
  const [exercise, setExercise] = useState("");
  const [doingExercise, setDoingExercise] = useState(false);

  const handleBodyPartClick = (part) => {
    setExercise(part);
    setDoingExercise(true);

    // Automatically stop after 10 seconds
    setTimeout(() => {
      setDoingExercise(false);
      alert(`${part} exercise completed!`);
    }, 10000);
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

      {/* Exercise Animation Display */}
      {doingExercise && (
        <motion.div
          className='mt-6 p-4 bg-green-300 rounded shadow-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-xl font-bold'>Doing: {exercise}</h2>
          <p>Exercise in progress... ⏳</p>
          <motion.div
            className='w-full bg-gray-200 rounded h-4 mt-2'
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Front View Buttons */}
      {!doingExercise && view === "front" && (
        <div className='flex flex-col items-center space-y-4 mt-6'>
          <BodyPartButton
            label='Chest'
            onClick={() =>
              handleBodyPartClick("Chest - Push-ups for 10 seconds")
            }
          />
          <BodyPartButton
            label='Abs'
            onClick={() => handleBodyPartClick("Abs - Crunches for 10 seconds")}
          />
          <BodyPartButton
            label='Quads'
            onClick={() => handleBodyPartClick("Quads - Squats for 10 seconds")}
          />
        </div>
      )}

      {/* Back View Buttons */}
      {!doingExercise && view === "back" && (
        <div className='flex flex-col items-center space-y-4 mt-6'>
          <BodyPartButton
            label='Head'
            onClick={() =>
              handleBodyPartClick("Head - Neck stretches for 10 seconds")
            }
          />
          <BodyPartButton
            label='Back'
            onClick={() => handleBodyPartClick("Back - Rows for 10 seconds")}
          />
          <BodyPartButton
            label='Glutes'
            onClick={() =>
              handleBodyPartClick("Glutes - Hip Thrusts for 10 seconds")
            }
          />
        </div>
      )}
    </div>
  );
}
