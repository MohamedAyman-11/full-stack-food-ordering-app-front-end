import { z } from "zod";
// AUTH
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().trim().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = loginSchema
  .extend({
    first_name: z.string().trim().min(2, "First name is required"),
    last_name: z.string().trim().min(2, "Last name is required"),
    confirm_password: z
      .string()
      .trim()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords do not match",
    path: ["confirm_password"],
  });

export const forgotSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetSchema = z
  .object({
    new_password: z
      .string()
      .trim()
      .min(8, "New password must be at least 8 characters"),
    confirm_password: z
      .string()
      .trim()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    error: "Passwords do not match",
    path: ["confirm_password"],
  });
export type LoginSchemeType = z.infer<typeof loginSchema>;
export type RegisterSchemeType = z.infer<typeof registerSchema>;
export type ForgotSchemeType = z.infer<typeof forgotSchema>;
export type ResetSchemeType = z.infer<typeof resetSchema>;

// PROFILE

export const accountDetailsSchema = z.object({
  first_name: z.string().trim().min(2, "First name is required"),

  last_name: z.string().trim().min(2, "Last name is required"),

  email: z.email("Invalid email address"),

  primary_phone: z
    .string()
    .regex(/^\d*$/, "Phone number must contain only numbers")
    .optional(),

  secondary_phone: z
    .string()
    .regex(/^\d*$/, "Phone number must contain only numbers")
    .optional(),

  street: z.string().trim().optional(),
  postal_code: z.string().trim().optional(),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
});

export const updatePasswordSchema = z
  .object({
    current_password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
    new_password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.current_password !== data.new_password, {
    error: "Passwords must be different!",
    path: ["new_password"],
  });
export type AccountDetailsType = z.infer<typeof accountDetailsSchema>;
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;

// EXTRAS

export const extraSchema = z.object({
  extra_name: z
    .string()
    .trim()
    .min(2, "Extra name must ne 2 character at least"),
});

export type ExtraSchemaType = z.infer<typeof extraSchema>;

// SIZES

export const sizeSchema = z.object({
  size_name: z.string().trim().min(2, "Size name must ne 2 character at least"),
});

export type SizeSchemaType = z.infer<typeof sizeSchema>;

// Categories

export const categorySchema = z.object({
  category_name: z
    .string()
    .trim()
    .min(2, "Category name must ne 2 character at least"),
});
export type CategorySchemaType = z.infer<typeof categorySchema>;
