'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react'; // Import signIn
import styles from './LoginPage.module.css'; 

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState(''); // This will handle both email and phone number
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [user, setUser] = useState(null);

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
          router.push('/dashboard'); // Redirect to a protected page
        }, 1000);
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


  const [sdkLoaded, setSdkLoaded] = useState(false); // State to track if SDK is loaded

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

  // Facebook login function
  function loginWithFacebook() {
    if (sdkLoaded && typeof FB !== 'undefined') {
      FB.login(function (response) {
        if (response.authResponse) {
          if (response ) {
            //const token = data.access;
    
            // Store the token in localStorage or cookies
            //localStorage.setItem('accessToken', token);
            //toast.success('Logged in successfully!', {
            //  style: { background: 'blue', color: 'white' },
            //  duration: 2000,
            //});
            //setTimeout(() => {
            //  router.//push('/dashboard'); // Redirect to a protected page
            //}, 1000);
            const fbSessionKey = Object.keys(sessionStorage).find((key) => key.startsWith('fbssls_'));
  
            if (fbSessionKey) {
              // Parse the sessionStorage value
              const sessionValue = sessionStorage.getItem(fbSessionKey);

              // Extract the accessToken
              if (sessionValue) {
                // Parse the sessionStorage value (guaranteed to be a string now)
                const sessionData = JSON.parse(sessionValue);
          
                // Extract the accessToken
                const accessToken = sessionData?.authResponse?.accessToken;
                const userID = sessionData?.authResponse?.userID;
          
                if (accessToken) {
                  console.log("Extracted Access Token:", accessToken);
                  console.log("Extracted User ID:", userID);
          
                  // Optionally store it under 'accessToken' key for further use
                  localStorage.setItem('accessToken', accessToken);
                  localStorage.setItem('facebookID', userID);
                } else {
                  console.log("Access token not found");
                }
              } else {
                console.log("Session value not found");
              }
            } else {
              console.log("Facebook session key not found in sessionStorage");
            }

          } 
          console.log('Login successful:', response);
          //router.push('/dashboard');

          const responsee = 'ok';

  
          const { accessToken, userID } = response.authResponse;
  
          // Send the accessToken and userID to your backend API
          fetch('http://127.0.0.1:8000/accounts/facebook/', { // Change to your backend URL
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accessToken,
              userID,
            }),
          })
            .then(res => res.json())
            .then(data => {
            console.log('Backend response:', data);
              //router.push('/dashboard');
              // Handle the response store token
            const response = 'ok';
            if (response == 'ok' ) {
              const token = data.access;
      
              // Store the token in localStorage or cookies
              //localStorage.setItem('accessToken', token);
              toast.success('Logged in successfully!', {
                style: { background: 'blue', color: 'white' },
                duration: 2000,
              });
              setTimeout(() => {
                router.push('/dashboard'); // Redirect to a protected page
              }, 1000);
            } else {
              //const data = await response.json();
              setError(data.detail || 'Login failed');
            }
            })
            .catch(err => {
              console.error('Error sending data to backend:', err);
            });
          
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'email' });
    } else {
      console.error('Facebook SDK is not loaded yet.');
    }
  } 

  const handleLogout = () => {
    console.log('User logged out from Facebook:');
    
    // Remove Facebook token(s) from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('fblst_' && 'facebookID')) {
        localStorage.removeItem(key);
        console.log(`Removed from localStorage: ${key}`);
      }
    }
  
    // Remove Facebook token(s) from sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('fbssls_')) {
        sessionStorage.removeItem(key);
        console.log(`Removed from sessionStorage: ${key}`);
      }
    }
  
    // Optionally, remove other user-related info like user ID
    localStorage.removeItem('userID');
  

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
          onClick={loginWithFacebook}
          className={styles.googleButton} // Add a new style for Google button
        >
          Login with Facebook
        </button>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
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
