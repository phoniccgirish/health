import { useState } from "react";
import axios from "axios";

function BodyPicUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:8000/upload-body-pic/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAnalysisResult(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='mb-4'
      />
      <button
        onClick={handleUpload}
        className='bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded'
      >
        Upload Body Picture
      </button>

      {analysisResult && (
        <div className='mt-6 bg-gray-800 text-gray-200 p-4 rounded shadow'>
          <h3 className='text-xl font-semibold'>Analysis Result</h3>
          <p>
            <strong>Body Type:</strong> {analysisResult.body_type}
          </p>
          <p>
            <strong>BMI:</strong> {analysisResult.BMI}
          </p>
          <p>
            <strong>Suggested Diet:</strong>
          </p>
          <ul className='list-disc ml-6'>
            {analysisResult.suggested_diet.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BodyPicUploader;
