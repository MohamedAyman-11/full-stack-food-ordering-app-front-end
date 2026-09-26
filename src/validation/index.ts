import { z } from 'zod';

const imageSchema = z
  .instanceof(File, {
    message: 'Image is required',
  })
  .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
    message: 'Only JPEG, PNG, and WebP images are allowed',
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'Image size must be less than 5MB',
  });

const ProductSchemaBase = z.object({
  name: z.string().trim().min(4, 'Name must be 4 characters at least!'),

  description: z
    .string()
    .trim()
    .min(20, 'Description must be between 20 and 240 characters!')
    .max(240, 'Description must be between 20 and 240 characters!'),

  price: z.preprocess(
    (value) => Number(value),
    z
      .number('Price must be a valid number')
      .positive('Price must be greater than 0')
      .multipleOf(0.01, 'Price can have at most 2 decimal places'),
  ),

  discount: z.preprocess(
    (value) => Number(value),
    z
      .number('Discount must be a valid number')
      .min(0, 'Discount must be greater than or equal to 0')
      .max(100, 'Discount cannot be greater than 100'),
  ),

  category: z.string().min(1, 'Please select a category'),

  image: imageSchema,
});

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().trim().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = loginSchema
  .extend({
    first_name: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .min(4, 'First name must be 4 characters at least')
      .max(10, 'First name must be 10 characters at most'),
    last_name: z
      .string()
      .trim()
      .min(1, 'Last name is required')
      .min(4, 'Last name must be 4 characters at least')
      .max(10, 'Last name must be 10 characters at most'),
    confirm_password: z.string().trim().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const forgotSchema = z.object({
  email: z.email('Invalid email address'),
});

export const resetSchema = z
  .object({
    new_password: z.string().trim().min(8, 'New password must be at least 8 characters'),
    confirm_password: z.string().trim().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    error: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const accountDetailsSchema = z.object({
  image: imageSchema.optional(),
  first_name: z.string().trim().min(2, 'First name is required'),

  last_name: z.string().trim().min(2, 'Last name is required'),

  email: z.email('Invalid email address'),

  primary_phone: z.string().regex(/^\d*$/, 'Phone number must contain only numbers').optional(),

  secondary_phone: z.string().regex(/^\d*$/, 'Phone number must contain only numbers').optional(),

  street: z.string().trim().optional(),
  postal_code: z.string().trim().optional(),
  city: z.string().trim().optional(),
  country: z.string().trim().optional(),
});

export const updatePasswordSchema = z
  .object({
    current_password: z.string().trim().min(8, 'Password must be at least 8 characters'),
    new_password: z.string().trim().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.current_password !== data.new_password, {
    error: 'Passwords must be different!',
    path: ['new_password'],
  });

export const extraSchema = z.object({
  extra_name: z.string().trim().min(2, 'Extra name must ne 2 character at least'),
});

export const sizeSchema = z.object({
  size_name: z.string().trim().min(2, 'Size name must ne 2 character at least'),
});

export const categorySchema = z.object({
  image: imageSchema,
  category_name: z.string().trim().min(2, 'Category name must ne 2 character at least'),
});

export const categorySchemaUpdate = categorySchema.extend({
  image: imageSchema.optional(),
});

export const ProductSchema = ProductSchemaBase;

export const ProductSchemaUpdate = ProductSchemaBase.extend({
  image: imageSchema.optional(),
});

export const OrderSchema = z.object({
  street: z.string().trim().min(3, 'Street must be 3 characters at least '),
  postal_code: z.string().trim().min(3, 'Postal code must be 3 characters at least '),
  city: z.string().trim().min(3, 'City must be 3 characters at least '),
  country: z.string().trim().min(3, 'Country must be 3 characters at least '),
  customer_phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d*$/, 'Phone number must contain only numbers'),
});

export const deliveryRegisterSchema = z.object({
  name: z.string().trim().min(5, 'Name must be 5 characters at least!').max(20, 'Name must be 20 characters at most!'),
  email: z.email('Invalid email!').transform((email) => email.toLowerCase()),
  password: z.string().trim().min(8, 'Password must 8+ characters'),
  phone: z.string().trim().min(1, 'Phone number is required').regex(/^\d*$/, 'Phone must contain only numbers'),
  vehicle: z.enum(['BIKE', 'SCOOTER', 'CAR'], 'Invalid delivery vehicle'),
});

export const confirmOrderSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

export const contactUsFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),

  email: z.email('Please enter a valid email address'),

  subject: z
    .string()
    .trim()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be at most 100 characters'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be at most 1000 characters'),
});
/* ============================================ TYPES ============================================*/

// AUTH
export type LoginSchemeType = z.infer<typeof loginSchema>;
export type RegisterSchemeType = z.infer<typeof registerSchema>;
export type ForgotSchemeType = z.infer<typeof forgotSchema>;
export type ResetSchemeType = z.infer<typeof resetSchema>;

// USER PROFILE
export type AccountDetailsSchemaType = z.infer<typeof accountDetailsSchema>;
export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;

// SIZES & EXTRAS
export type ExtraSchemaType = z.infer<typeof extraSchema>;
export type SizeSchemaType = z.infer<typeof sizeSchema>;

// CATEGORIES
export type CategorySchemaType = z.infer<typeof categorySchema>;
export type CategorySchemaUpdateInputType = z.input<typeof categorySchemaUpdate>;
export type CategorySchemaUpdateOutPutType = z.output<typeof categorySchemaUpdate>;

// PRODUCTS
export type ProductSchemaInput = z.input<typeof ProductSchema>;
export type ProductSchemaOutput = z.output<typeof ProductSchema>;
export type ProductSchemaUpdateInput = z.input<typeof ProductSchemaUpdate>;
export type ProductSchemaUpdateOutput = z.output<typeof ProductSchemaUpdate>;

// ORDERS
export type OrderSchemaType = z.infer<typeof OrderSchema>;

// DELIVERY
export type DeliveryRegisterSchemaType = z.infer<typeof deliveryRegisterSchema>;
export type ConfirmOrderSchemaType = z.infer<typeof confirmOrderSchema>;

export type ContactUsFormSchemaType = z.infer<typeof contactUsFormSchema>;
