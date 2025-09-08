import React, { useState } from "react";
import { supabase } from "./lib/supabaseClient";
// import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  //   const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("SignUp error:", error);
      setErrorMessage(error.message);
    } else {
      console.log("User signed up:", data.user);
      setSuccessMessage(
        "Sign up successful! Please check your email for verification."
      );

      // Optional: Redirect after successful signup
      // navigate("/login")
    }

    setLoading(false);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>Sign Up</h2>

      <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className='p-3 border rounded focus:outline-blue-500'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className='p-3 border rounded focus:outline-blue-500'
        />

        <button
          type='submit'
          disabled={loading}
          className='p-3 bg-green-600 text-white rounded hover:bg-green-700 transition'
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {errorMessage && (
        <p className='mt-4 text-center text-red-600'>{errorMessage}</p>
      )}

      {successMessage && (
        <p className='mt-4 text-center text-green-600'>{successMessage}</p>
      )}
    </div>
  );
}
