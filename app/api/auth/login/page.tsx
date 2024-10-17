"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react'; 
import styles from './LoginPage.module.css'; 

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState(''); // This will handle both email and phone number
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters
  const redirectTo = searchParams.get('redirect');
  const [sdkLoaded, setSdkLoaded] = useState(false); // State to track if Facebook SDK is loaded
  const [showModal, setShowModal] = useState(false);

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
          duration: 2000,
        });
        setTimeout(() => {
          router.push(redirectTo || '/dashboard'); // Redirect to a protected page
        }, 1000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };






  useEffect(() => {
    // Initialize the Facebook SDK when the component is mounted
    window.fbAsyncInit = function () {
      FB.init({
        appId: '824628613116710', // Replace with your actual Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v15.0', 
      });
      setSdkLoaded(true); // Set flag to true once SDK is initialized
    };

    // Dynamically load the Facebook SDK
    (function (d, s, id) {
      var js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Google Login Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '774735286879-1liiqcdt99ut6hev3n42a48955rfn932.apps.googleusercontent.com',
          callback: handleGoogleLoginResponse,
        });
        window.google.accounts.id.renderButton(
          document.querySelector('.g_id_signin'),
          { theme: 'outline', size: 'large' }
        );
      }
    };
  }, []);

  const handleGoogleLoginResponse = (response: google.accounts.id.CredentialResponse) => {
    const googleToken = response.credential;
  
    if (googleToken) {
      const decodedToken = JSON.parse(atob(googleToken.split('.')[1])); // Decode the token payload
      const { sub, email, given_name,family_name, picture } = decodedToken;
  
      // Send the user information to your backend
      fetch('http://127.0.0.1:8000/accounts/google/', { // Your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sub,    // Google unique user ID
          email,
          given_name,  // Email
          family_name,   // Full name
          picture // Profile picture
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user_id) {
            console.log('User ID:', data.user_id);
            localStorage.setItem('userID', data.user_id);
            localStorage.setItem('accessToken', data.token);
            console.log('accessToken:', data.token);
            toast.success('Logged in successfully!', {
              style: { background: 'green', color: 'white' },
              duration: 2000,
            });
            setTimeout(() => {
              router.push(redirectTo || '/dashboard');// Redirect to dashboard
            }, 1000);
          } else {
            setError('Login failed');
          }
        })
        .catch(() => setError('An error occurred'));
    }
  };
  
  
  

  // Facebook login function
  function loginWithFacebook() {
    if (sdkLoaded && typeof FB !== 'undefined') {
      FB.login(function (response) {
        if (response.authResponse) {
          const { accessToken, userID } = response.authResponse;

          // Send the accessToken and userID to your backend API
          fetch('http://127.0.0.1:8000/accounts/facebook/', { // Your backend URL for Facebook login
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken, userID }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.access) {
                localStorage.setItem('accessToken', data.access);
                toast.success('Logged in with Facebook successfully!', {
                  style: { background: 'blue', color: 'white' },
                  duration: 2000,
                });
                setTimeout(() => {
                  router.push(redirectTo || '/dashboard'); // Redirect to dashboard
                }, 1000);
              } else {
                setError('Facebook login failed');
              }
            })
            .catch(() => setError('An error occurred'));
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'email' });
    } else {
      console.error('Facebook SDK is not loaded yet.');
    }
  }

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
    
    <div className={styles.container}>
    <button onClick={handleBack} className={styles.back}>
      Back
    </button>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Login</h2>
        {error && <p className={styles.error}>{error}</p>}

        {/* Use Phone or Email Button */}
        <button className={styles.button} onClick={handleModalToggle}>
          Use Phone or Email
        </button>

        {/* Facebook Login Button */}
        <button onClick={loginWithFacebook} className={styles.facebookButton}>
          Login with Facebook
        </button>

        {/* Google Login Button (outside the modal) */}
        <div className="g_id_signin" style={{ marginTop: '10px' }}></div>

        {/* Modal for Phone or Email Login */}
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeBtn} onClick={handleModalToggle}>
                &times;
              </span>
              <h3>Login with Phone or Email</h3>
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
                <button type="submit" className={styles.button}>
                  Login
                </button>
              </form>
            </div>
          </div>
        )}

        <p className={styles.footerText}>
          Do not have an account?
          <a href="/register" className={styles.footerLink}>
            Register
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;