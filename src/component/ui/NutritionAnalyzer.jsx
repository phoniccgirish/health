import React, { useState } from "react";
import axios from "axios";

// This new component is dedicated to food nutrition analysis.
function NutritionAnalyzer({ showPopup }) {
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleAnalyzeFoodPic = async () => {
    if (!selectedFile) return showPopup("Error", "Please select a file first.");

    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsLoading(true);

    try {
      // This is the new backend endpoint you need to create
      const res = await axios.post(
        "http://localhost:8000/analyze-food-image/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setNutritionInfo(res.data);
    } catch (error) {
      console.error("Food analysis failed:", error);
      showPopup("Error", "Failed to analyze food picture.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='mb-8 bg-gray-800 p-6 rounded-lg w-full max-w-md'>
      <h2 className='text-2xl font-semibold mb-4'>
        Upload Food Picture for Nutrition Analysis
      </h2>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100'
      />
      <button
        onClick={handleAnalyzeFoodPic}
        disabled={isLoading}
        className='bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded disabled:bg-gray-500 w-full'
      >
        {isLoading ? "Analyzing..." : "Analyze Food"}
      </button>

      {nutritionInfo && (
        <div className='mt-6 bg-gray-700 p-4 rounded shadow'>
          <h3 className='text-xl font-bold mb-2'>
            Nutrition Info for:{" "}
            <span className='text-teal-400'>{nutritionInfo.food_item}</span>
          </h3>
          <ul className='space-y-1 text-gray-300'>
            <li>
              <strong>Calories:</strong> {nutritionInfo.calories} kcal
            </li>
            <li>
              <strong>Protein:</strong> {nutritionInfo.protein_g} g
            </li>
            <li>
              <strong>Carbs:</strong> {nutritionInfo.carbs_g} g
            </li>
            <li>
              <strong>Fats:</strong> {nutritionInfo.fats_g} g
            </li>
          </ul>
          <p className='mt-4 pt-4 border-t border-gray-600'>
            <strong>Suggestions:</strong>
          </p>
          <ul className='list-disc ml-6 text-gray-300'>
            {nutritionInfo.suggestions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default NutritionAnalyzer;
