import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import BodyPartButton from "../ui/BodyPartButton";
import ViewTracker from "../ui/ViewTracker";
import { Group } from "three";

export default function Body() {
  const [view, setView] = useState("front");
  const [exercise, setExercise] = useState("");
  const [doingExercise, setDoingExercise] = useState(false);
  const [blinkPart, setBlinkPart] = useState("");

  const handleBodyPartClick = (partLabel, partName) => {
    setExercise(partLabel);
    setBlinkPart(partName);
    setDoingExercise(true);

    setTimeout(() => {
      setBlinkPart("");
      setDoingExercise(false);
      alert(`${partLabel} exercise completed!`);
    }, 10000); // Blink duration
  };

  return (
    <div className='w-full h-screen pt-16 flex flex-col items-center justify-center'>
      <div className='w-[400px] h-[500px] border rounded-xl shadow-lg flex items-center justify-center'>
        <Canvas
          style={{ background: "#222" }}
          camera={{ position: [0, 1.5, 3], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 5, 5]} intensity={0.8} />

          <Suspense fallback={null}>
            {/* Wrap the model in a group to keep it centered */}
            <group position={[0, -1, 0]}>
              <Model path='/model.gltf' blinkPart={blinkPart} />
            </group>
          </Suspense>

          <ViewTracker setView={setView} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>

      {doingExercise && (
        <div className='mt-6 p-4 bg-green-300 rounded shadow-lg'>
          <h2 className='text-xl font-bold'>Doing: {exercise}</h2>
          <p>Exercise in progress... ⏳</p>
          <div className='w-full bg-gray-200 rounded h-4 mt-2'>
            <div
              className='bg-blue-500 h-4 rounded'
              style={{ width: "100%", transition: "width 10s linear" }}
            />
          </div>
        </div>
      )}

      {!doingExercise && view === "front" && (
        <div className='flex flex-col items-center space-y-4 mt-6'>
          <BodyPartButton
            label='Chest'
            onClick={() =>
              handleBodyPartClick("Chest - Push-ups", "Chest_Mesh")
            }
          />
          <BodyPartButton
            label='Abs'
            onClick={() => handleBodyPartClick("Abs - Crunches", "Abs_Mesh")}
          />
          <BodyPartButton
            label='Quads'
            onClick={() => handleBodyPartClick("Quads - Squats", "Quads_Mesh")}
          />
        </div>
      )}

      {!doingExercise && view === "back" && (
        <div className='flex flex-col items-center space-y-4 mt-6'>
          <BodyPartButton
            label='Head'
            onClick={() =>
              handleBodyPartClick("Head - Neck stretches", "Head_Mesh")
            }
          />
          <BodyPartButton
            label='Back'
            onClick={() => handleBodyPartClick("Back - Rows", "Back_Mesh")}
          />
          <BodyPartButton
            label='Glutes'
            onClick={() =>
              handleBodyPartClick("Glutes - Hip Thrusts", "Glutes_Mesh")
            }
          />
        </div>
      )}
    </div>
  );
}
