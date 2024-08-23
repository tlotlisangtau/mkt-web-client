// lib/validationSchema.ts
import { z } from 'zod';

export const registrationSchema = z.object({
  username: z.string().min(5, "Username is required"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
