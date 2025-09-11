import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !avatar || !name) {
      alert("All fields are required");
      return;
    }

    setUser({
      loggedIn: true,
      name,
      email,
      avatar,
    });

    navigate("/"); // Redirect to home after login
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow-md w-full max-w-sm'
      >
        <h2 className='text-xl font-bold mb-4'>Login</h2>

        <input
          type='text'
          placeholder='Full Name'
          className='w-full p-2 mb-4 border rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type='email'
          placeholder='Email'
          className='w-full p-2 mb-4 border rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type='text'
          placeholder='Avatar Image URL'
          className='w-full p-2 mb-4 border rounded'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />

        <button
          type='submit'
          className='w-full bg-teal-500 text-white p-2 rounded'
        >
          Login
        </button>
      </form>
    </div>
  );
}
