"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PasswordReset.module.css";
import { passwordResetSchema } from "@/lib/validationSchema"; // Make sure this schema is defined
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: PasswordResetFormData) => {
    setMessage("");
    setError("");

    const response = await fetch(
      "http://127.0.0.1:8000/accounts/password-reset/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          new_password: data.newPassword,
          confirm_password: data.confirmPassword,
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      setMessage(responseData.detail);
      
      setTimeout(() => {
        router.push("/api/auth/login"); 
      }, 2000); 
    } else {
      const responseData = await response.json();
      setError(responseData.detail || "An error occurred.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email or Phone Number:
            <input type="text" {...register("identifier")} required />
          </label>
          {errors.identifier && (
            <p className={styles.error}>{errors.identifier.message}</p>
          )}
        </div>
        <div>
          <label>
            New Password:
            <input type="password" {...register("newPassword")} required />
          </label>
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword.message}</p>
          )}
        </div>
        <div>
          <label>
            Confirm Password:
            <input type="password" {...register("confirmPassword")} required />
          </label>
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <br />
      {message && (
        <p className={`${styles.message} ${styles.success}`}>{message}</p>
      )}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
    </div>
  );
};

export default PasswordReset;
