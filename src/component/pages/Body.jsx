import React, { useState, useEffect, useCallback } from "react";
import CanvasViewer from "../CanvasViewer";
import ExerciseButtons from "../ExerciseButtons";
import PopupModal from "../PopupModal";
// --- UserInfo import is GONE ---
import axios from "axios";

function Body() {
  const [view, setView] = useState("main");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [popup, setPopup] = useState({
    visible: false,
    title: "",
    message: "",
  });
  const [userUID] = useState("anonymous-uid-123456");
  const [history, setHistory] = useState([]);

  const showPopup = (title, message) =>
    setPopup({ visible: true, title, message });
  const closePopup = () => setPopup({ visible: false, title: "", message: "" });

  const fetchHistory = useCallback(async () => {
    if (!userUID) return;
    try {
      const res = await axios.get(`http://localhost:8000/history/${userUID}/`);
      // setHistory(res.data.history);
      // This is the NEW, FIXED line:
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
      showPopup("History Error", "Could not load exercise history.");
    }
  }, [userUID]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
    setView("detail");
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(exercise.description)
    );
  };

  const handleCompleteExercise = async () => {
    if (!selectedExercise) return;

    const payload = {
      user_id: userUID,
      body_part: selectedExercise.bodyPart,
      exercise: selectedExercise.label,
    };
    // Note: Your backend (models.py) is already handling the timestamp automatically.
    // No need to send it from the frontend.

    try {
      await axios.post("http://localhost:8000/track-exercise/", payload);
      showPopup("Success!", "Exercise logged successfully.");
      setView("main");
      setSelectedExercise(null);
      fetchHistory(); // Refresh history after logging
    } catch (error) {
      console.error("Failed to log exercise:", error);
      showPopup("Error", "Failed to log exercise. Please try again.");
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white font-sans p-4 flex flex-col items-center'>
      <div className='max-w-5xl w-full bg-gray-800 rounded-2xl shadow-lg p-6'>
        {view === "main" && (
          <>
            <h1 className='text-4xl font-black mb-4 text-center text-gradient bg-gradient-to-r from-blue-400 to-emerald-400'>
              Targeted Fitness
            </h1>
            <CanvasViewer mode='main' />
            <ExerciseButtons onExerciseSelect={handleExerciseSelect} />

            {/* Exercise History Section */}
            <section className='mt-6'>
              <h2 className='text-2xl font-semibold mb-4'>Exercise History</h2>
              <div className='bg-gray-700 p-4 rounded shadow max-h-60 overflow-y-auto'>
                {history.length === 0 ? (
                  <p>No exercise history found.</p>
                ) : (
                  <ul className='list-disc ml-6 space-y-2'>
                    {history.map((item) => (
                      <li key={item.id}>
                        <span className='font-semibold'>
                          {new Date(item.timestamp).toLocaleString()}:
                        </span>{" "}
                        {item.body_part} - {item.exercise}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </>
        )}

        {view === "detail" && selectedExercise && (
          <div className='flex flex-col items-center'>
            <button
              className='text-blue-400 hover:text-blue-300 mb-4 self-start'
              onClick={() => setView("main")}
            >
              ← Back to Overview
            </button>

            <h2 className='text-3xl font-bold mb-2'>
              {selectedExercise.label}
            </h2>
            <p className='mb-6 text-gray-300'>{selectedExercise.description}</p>

            <CanvasViewer mode='detail' exercise={selectedExercise} />

            <button
              className='bg-green-500 hover:bg-green-600 text-gray-900 font-bold rounded-full px-6 py-3 mt-4 transition-colors'
              onClick={handleCompleteExercise}
            >
              Complete Exercise
            </button>
          </div>
        )}
      </div>

      {/* --- UserInfo component tag is GONE --- */}

      {popup.visible && (
        <PopupModal
          title={popup.title}
          message={popup.message}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Body;
