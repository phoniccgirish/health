import React from "react";

// Mock data for the exercises. In a real app, you might fetch this from your DB.
const EXERCISES = [
  {
    id: "chest",
    label: "Push-ups",
    bodyPart: "Chest",
    description: "A basic push-up for chest development.",
  },
  {
    id: "legs",
    label: "Squats",
    bodyPart: "Legs",
    description: "A compound movement for overall leg strength.",
  },
  {
    id: "back",
    label: "Pull-ups",
    bodyPart: "Back",
    description: "An advanced upper-body pulling exercise.",
  },
  {
    id: "core",
    label: "Plank",
    bodyPart: "Core",
    description: "An isometric exercise to strengthen the core.",
  },
];

// This component receives the 'onExerciseSelect' function as a prop from Body.jsx
const ExerciseButtons = ({ onExerciseSelect }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4 mt-6'>
      {EXERCISES.map((ex) => (
        <button
          key={ex.id}
          // When clicked, it calls the function from the parent (Body.jsx)
          // and passes the entire exercise object up.
          onClick={() => onExerciseSelect(ex)}
          className='px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors'
        >
          {ex.label}
        </button>
      ))}
    </div>
  );
};

export default ExerciseButtons;
