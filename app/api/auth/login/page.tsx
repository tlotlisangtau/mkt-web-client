'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast, Toaster } from 'react-hot-toast';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
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
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access;

        localStorage.setItem('accessToken', token);
        toast.success('Logged in successfully!', {
          style: { background: 'blue', color: 'white' },
          duration: 4000,
        });
        setTimeout(() => {
          router.push('/protected');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
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
        <hr />
        <button
          onClick={() => signIn('google')}
          className={`${styles.button} ${styles.googleButton}`}
        >
          Login with Google
        </button>
        <button
          onClick={() => signIn('facebook')}
          className={`${styles.button} ${styles.facebookButton}`}
        >
          Login with Facebook
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
