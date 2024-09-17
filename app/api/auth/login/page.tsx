'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react'; // Import signIn
import styles from './LoginPage.module.css'; 

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState(''); // This will handle both email and phone number
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }), // Use identifier instead of username
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access;

        // Store the token in localStorage or cookies
        localStorage.setItem('accessToken', token);
        toast.success('Logged in successfully!', {
          style: { background: 'blue', color: 'white' },
          duration: 4000,
        });
        setTimeout(() => {
          router.push('/dashboard'); // Redirect to a protected page
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/protected' }); // Use Google provider
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formElement}>
            <label htmlFor="identifier" className={styles.label}>
              Email or Phone Number
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formElement}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className={styles.googleButton} // Add a new style for Google button
        >
          Login with Google
        </button>
        <p className={styles.footerText}>
          Don't have an account?{' '}
          <a href="/register" className={styles.footerLink}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
