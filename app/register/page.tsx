"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { registrationSchema } from "@/lib/validationSchema"; // Adjust path as needed
import styles from "./RegisterPage.module.css"; // Import the CSS module

type FormData = z.infer<typeof registrationSchema>;

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange", // Validate on each change
  });

  const router = useRouter();

  const notifySuccess = () =>
    toast.success("Registered successfully!", {
      style: { background: "blue", color: "white" },
      duration: 4000,
    });

  const notifyError = (message: string) =>
    toast.error(message, {
      style: { background: "red", color: "white" },
      duration: 4000,
    });

const onSubmit = async (data: FormData) => {
  try {

    const payload = {
      ...data,
      email: data.email || null, // Handle optional email
    };

    const response = await fetch(
      "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/accounts/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Use the payload with email handled
      }
    );

    if (response.ok) {
      notifySuccess();
      setTimeout(() => {
        router.push("/api/auth/login");
      }, 2500); // Redirect after 2.5 seconds
    } else {
      const errorData = await response.json();

      if (errorData.username) {
        notifyError(errorData.username[0]);
      } else if (errorData.email) {
        notifyError(errorData.email[0]);
      } else if (errorData.phone_number) {
        notifyError(errorData.phone_number[0]);
      } else {
        notifyError(errorData.detail || "Registration failed");
      }
    }
  } catch (err) {
    notifyError("An error occurred");
  }
};



  const getInputClass = (fieldName: keyof FormData) => {
    return errors[fieldName] ? styles.inputError : styles.input;
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
              {...register("username")}
              className={getInputClass("username")}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="email" className={styles.label}>
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={getInputClass("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="phoneNumber" className={styles.label}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              {...register("phone_number")}
              className={getInputClass("phone_number")}
            />
            {errors.phone_number && (
              <p className={styles.error}>{errors.phone_number.message}</p>
            )}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className={getInputClass("first_name")}
            />
            {errors.first_name && (
              <p className={styles.error}>{errors.first_name.message}</p>
            )}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              className={getInputClass("last_name")}
            />
            {errors.last_name && (
              <p className={styles.error}>{errors.last_name.message}</p>
            )}
          </div>
          <div className={styles.formElement}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={getInputClass("password")}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className={styles.button} disabled={!isValid}>
            Register
          </button>
        </form>
        <p className={styles.footerText}>
          Already have an account?{" "}
          <a href="/api/auth/login" className={styles.footerLink}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
