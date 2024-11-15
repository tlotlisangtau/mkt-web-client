
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


export const jobSchema = z.object({
  name: z.string().min(2, 'Job Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  salary: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Salary must be a number with up to two decimal places'),
  mobile_number: z
    .string()
    .regex(/^\d{7,10}$/, 'Mobile number must be between 7 and 10 digits'),
  job_location: z.string().min(2, 'Location must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  valid_until: z.string().nonempty('Valid until date is required'),
  department: z.string().nonempty('Department is required'),
  complete: z.boolean(),

});