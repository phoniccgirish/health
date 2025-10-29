import { useEffect, useState } from "react";
import axios from "axios";

function ExerciseHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/history/${userId}`);
        setHistory(res.data.history);
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className='bg-gray-800 text-gray-200 p-4 rounded shadow'>
      {history.length === 0 ? (
        <p>No exercise history found.</p>
      ) : (
        <ul className='list-disc ml-6'>
          {history.map((item, idx) => (
            <li key={idx}>
              <strong>{item.timestamp}</strong> — {item.body_part}:{" "}
              {item.exercise}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExerciseHistory;
