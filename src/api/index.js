import axios from "axios";

// This is the base URL for your Python backend
const API_URL = "http://localhost:8000";

/**
 * Sends a food name to the backend, which finds it on the USDA API
 * and logs it to our database.
 * @param {string} foodName - The food item to search for (e.g., "one raw apple")
 * @returns {Promise<object>} The new log entry saved in the database
 */
export const logFoodItem = async (foodName) => {
  if (!foodName) {
    throw new Error("Food name cannot be empty");
  }

  try {
    // This calls your FastAPI endpoint: POST http://localhost:8000/api/log-food/?food_name=...
    const response = await axios.post(
      `${API_URL}/api/log-food/`,
      null, // No request body (POST body is null)
      {
        params: {
          food_name: foodName, // The data is sent as a query parameter
        },
        // If you add authentication, you would add headers here:
        // headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    // Return the JSON data from the response (the new log entry)
    return response.data;
  } catch (error) {
    console.error(
      "Error logging food item:",
      error.response ? error.response.data : error.message
    );
    // Throw the error so the component (e.g., Body.jsx) can catch it and show a message
    throw error;
  }
};

// You can add all your other API functions here
// export const getUserProfile = async () => { ... }
