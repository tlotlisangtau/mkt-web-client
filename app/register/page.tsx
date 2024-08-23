'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { registrationSchema } from '@/lib/validationSchema'; // Adjust path as needed
import styles from './RegisterPage.module.css'; // Import the CSS module

type FormData = z.infer<typeof registrationSchema>;

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange', // Validate on each change
  });

  const router = useRouter();

  const notifySuccess = () => toast.success('Registered successfully!', {
    style: { background: 'blue', color: 'white' },
    duration: 4000
  });

  const notifyError = (message: string) => toast.error(message, {
    style: { background: 'red', color: 'white' },
    duration: 4000
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://localhost:8000/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        notifySuccess();
        setTimeout(() => {
          router.push('/Login');
        }, 5000); // Redirect after 5 seconds
      } else {
        const errorData = await response.json();
        notifyError(errorData.detail || 'Registration failed');
      }
    } catch (err) {
      notifyError('An error occurred');
    }
  };

  // Watch form fields to get real-time values
  const username = watch('username');
  const email = watch('email');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const password = watch('password');

  const getInputClass = (fieldName: keyof FormData) => {
    return errors[fieldName] ? styles.inputError : username ? styles.inputSuccess : styles.input;
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className={styles.formElement}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={getInputClass('username')}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={getInputClass('email')}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              className={getInputClass('firstName')}
            />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              className={getInputClass('lastName')}
            />
            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={getInputClass('password')}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={!isValid}
          >
            Register
          </button>
        </form>
        <p className={styles.footerText}>
          Already have an account?{' '}
          <a href="/Login" className={styles.footerLink}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
