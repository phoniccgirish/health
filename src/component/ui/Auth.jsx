import { useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // Ensure correct path
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
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

    if (isLoginMode) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        console.log("Logged in user:", data.user);
        localStorage.setItem(
          "supabase.auth.token",
          JSON.stringify(data.session)
        );
        setSuccessMessage(`Welcome back, ${data.user.email}!`);
        navigate("/");
      }
    } else {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        // If user already exists, attempt login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login after signup attempt error:", error);
          setErrorMessage(
            "User already exists. Please try to login with your credentials."
          );
        } else {
          console.log("Logged in user after signup attempt:", data.user);
          localStorage.setItem(
            "supabase.auth.token",
            JSON.stringify(data.session)
          );
          setSuccessMessage(`Welcome back, ${data.user.email}!`);
          navigate("/");
        }
      } else {
        // Otherwise, proceed to signup
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          console.error("Sign up error:", error);
          setErrorMessage(error.message);
        } else {
          console.log("Signed up user:", data.user);
          setSuccessMessage(
            "Sign up successful! Please check your email for verification."
          );
        }
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google login error:", error);
      setErrorMessage("Failed to login with Google. Please try again.");
    } else {
      console.log("Google OAuth login initiated:", data);
    }
    setLoading(false);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white'>
      <h2 className='text-3xl font-semibold mb-6 text-center'>
        {isLoginMode ? "Login" : "Sign Up"}
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
            ? isLoginMode
              ? "Logging in..."
              : "Creating account..."
            : isLoginMode
            ? "Login"
            : "Sign Up"}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className='mt-4 p-3 bg-red-500 text-white rounded hover:bg-red-600 transition w-full'
      >
        {loading ? "Processing..." : "Login with Google"}
      </button>

      {errorMessage && (
        <p className='mt-4 text-center text-red-600'>{errorMessage}</p>
      )}
      {successMessage && (
        <p className='mt-4 text-center text-green-600'>{successMessage}</p>
      )}

      <p className='mt-6 text-center'>
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className='text-blue-500 underline'
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
