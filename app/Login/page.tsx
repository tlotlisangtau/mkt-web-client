'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!', {
          style: { background: 'blue', color: 'white' },
          duration: 4000,
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleGoogleLogin = async () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm">
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Or login with</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Google
          </button>
        </div>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
