// src/components/Auth.js

import React, { useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// // src/component/ui/Auth.jsx
import { supabase } from "../../lib/supabaseClient"; // <-- This is the correct path// Make sure path is correct
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [authMode, setAuthMode] = useState("login"); // 'login', 'signup', or 'forgotPassword'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (authMode === "login") {
      // --- HANDLE LOGIN ---
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        console.log("Logged in user:", data.user);
        setSuccessMessage("Login successful! Redirecting...");
        navigate("/"); // Redirect to home page
      }
    } else if (authMode === "signup") {
      // --- HANDLE SIGN UP ---
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        console.log("Signed up user:", data.user);
        setSuccessMessage(
          "Sign up successful! Please check your email for verification."
        );
      }
    }
    setLoading(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // Optional: a page to handle password update
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage("Password reset link sent! Please check your email.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow-lg bg-white'>
      {/* --- PASSWORD RESET FORM --- */}
      {authMode === "forgotPassword" ? (
        <>
          <h2 className='text-3xl font-semibold mb-6 text-center'>
            Reset Password
          </h2>
          <form onSubmit={handlePasswordReset} className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className='p-3 border rounded focus:outline-blue-500'
            />
            <button
              type='submit'
              disabled={loading}
              className='p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </>
      ) : (
        // --- LOGIN & SIGN UP FORM ---
        <>
          <h2 className='text-3xl font-semibold mb-6 text-center'>
            {authMode === "login" ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleAuth} className='flex flex-col gap-4'>
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
              className='p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
            >
              {loading
                ? authMode === "login"
                  ? "Logging in..."
                  : "Creating account..."
                : authMode === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className='mt-4 p-3 bg-red-500 text-white rounded hover:bg-red-600 transition w-full'
          >
            {loading ? "Processing..." : "Continue with Google"}
          </button>
        </>
      )}

      {/* --- MESSAGES --- */}
      {errorMessage && (
        <p className='mt-4 text-center text-red-600'>{errorMessage}</p>
      )}
      {successMessage && (
        <p className='mt-4 text-center text-green-600'>{successMessage}</p>
      )}

      {/* --- TOGGLE LINKS --- */}
      <div className='mt-6 text-center'>
        {authMode === "login" && (
          <button
            onClick={() => setAuthMode("forgotPassword")}
            className='text-sm text-blue-500 hover:underline'
          >
            Forgot Password?
          </button>
        )}
        {authMode === "forgotPassword" && (
          <button
            onClick={() => setAuthMode("login")}
            className='text-sm text-blue-500 hover:underline'
          >
            Back to Login
          </button>
        )}
      </div>

      <p className='mt-4 text-center'>
        {authMode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
          className='text-blue-500 underline'
        >
          {authMode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
