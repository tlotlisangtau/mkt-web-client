
import { z } from 'zod';

export const registrationSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone_number: z.string().min(8, "Phone number is required").max(8, "Phone number is too long"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  confirm_password: z.string().min(6, "Please confirm your password"),
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"], 
});



export const passwordResetSchema = z.object({
  identifier: z.string().min(1, "Email or phone number is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});



// Define the Zod schema for your form
export const jobSchema = z.object({
  name: z.string().min(1, "Job name is required."),
  description: z.string().min(1, "Job description is required."),
  salary: z
    .string()
    .regex(/^\d+$/, "Salary must be a valid number.")
    .min(1, "Salary is required."),
  mobile_number: z
    .string()
    .regex(/^\d{8,8}$/, "Invalid Mobile number"),
  job_location: z.string().min(1, "Job location is required."),
  company: z.string().min(1, "Company is required."),
  //valid_until: z
  //  .string()
  //  .regex(
  //    /^\d{2}\/\d{2}\/\d{4}$/,
  //    "Valid Until must be in the format dd/mm/yyyy."
  //  ),
  complete: z.boolean(),
  department: z.string().min(1, "Department is required."),
});
