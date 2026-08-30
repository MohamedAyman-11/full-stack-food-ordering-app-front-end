import type { InputType } from '@/interfaces';

export enum Directions {
  RTL = 'rtl',
  LTR = 'ltr',
}

export enum Languages {
  ENGLISH = 'en',
  ARABIC = 'ar',
}

export enum Routes {
  ROOT = '/',
  MENU = 'menu',
  ABOUT = 'about',
  CONTACT = 'contact',
  AUTH = 'auth',
  CART = 'cart',
  PROFILE = 'profile',
  ADMIN = 'admin',
}

export enum Pages {
  LOGIN = 'signin',
  REGISTER = 'signup',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
  ABOUT = 'about',
  CONTACT = 'contact',

  // Profile
  ACCOUNT_DETAILS = 'account-details',
  PASSWORD = 'password',

  // Admin
  DASHBOARD = 'dashboard',
  CATEGORIES = 'categories',
  SIZES = 'sizes',
  EXTRAS = 'extras',
  ITEMS = 'items',
  CUSTOMERS = 'users',
  ORDERS = 'orders',
}
export enum Query_Keys {
  CATEGORIES = 'Categories',
  CATEGORIES_PRODUCTS = 'Categories_WITH_PRODUCTS',
  PRODUCT = 'Product',
  CURRENT_USER = 'Current_User',
  SIZES = 'Sizes',
  EXTRAS = 'Extras',
  CATEGORY = 'Category',
  ADMIN_USERS = 'AdminUsers',
  ADMIN_USER = 'AdminUser',
  CATEGORY_OPTIONS = 'CategoryOptions',
  PRODUCTS = 'Products',
}
export enum Messages {
  ADDED_TO_CART = 'Product added to cart successfully.',
  QUANTITY_UPDATED = 'Product quantity updated successfully.',
  LOGIN_SUCCESSFULLY = 'Login successful! Welcome back. 👋',
  SIGNUP_SUCCESSFULLY = 'Account created successfully. You can now log in.',
  LOGOUT_SUCCESSFULLY = 'Logout successful! See you soon. 👋',
  RESET_SUCCESSFULLY = 'Password reset successfully! You can now log in to Craveo with your new password. 🎉',
  PROFILE_UPDATED = 'Profile updated successfully. 🎉',
  PASSWORD_UPDATED = 'Password updated successfully. 🎉',
  SIZE_CREATED = 'Size created successfully. 🎉',
  SIZE_UPDATED = 'Size updated successfully. 🎉',
  SIZE_DELETED = 'Size deleted successfully. 🎉',
  EXTRA_CREATED = 'Extra created successfully. 🎉',
  EXTRA_UPDATED = 'Extra updated successfully. 🎉',
  EXTRA_DELETED = 'Extra deleted successfully. 🎉',
  CATEGORY_CREATED = 'Category created successfully. 🎉',
  CATEGORY_DELETED = 'Category deleted successfully. 🎉',
  CATEGORY_UPDATED = 'Category updated successfully. 🎉',
  ADMIN_USER_DELETED = 'User deleted successfully. 🎉',
  ADMIN_USER_UPDATED = 'User updated successfully. 🎉',
  PRODUCT_CREATED = 'Product created successfully. 🎉',
  PRODUCT_DELETED = 'Product deleted successfully. 🎉',
}
export const CheckoutInputs: InputType[] = [
  {
    id: crypto.randomUUID(),
    type: 'text',
    label: 'Street',
    name: 'street',
    placeholder: 'Enter your street',
  },
  {
    id: crypto.randomUUID(),
    type: 'number',
    label: 'Postal Code',
    name: 'postal_code',
    placeholder: 'Enter postal code',
  },
  {
    id: crypto.randomUUID(),
    type: 'text',
    label: 'City',
    name: 'city',
    placeholder: 'Enter your city',
  },
  {
    id: crypto.randomUUID(),
    type: 'text',
    label: 'Country',
    name: 'country',
    placeholder: 'Enter your country',
  },
];
