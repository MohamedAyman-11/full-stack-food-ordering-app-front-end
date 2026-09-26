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
  SEARCH = 'search',
  DELIVERY = 'delivery',
  DELIVERY_AUTH = '/delivery/auth',
}

export enum Pages {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
  ABOUT = 'about',
  SEARCH = 'search',
  CONTACT = 'contact',
  CHECKOUT = 'checkout',
  MY_ORDERS = 'orders',
  CHECKOUT_SUCCESS = 'checkout/success',
  CHECKOUT_CANCEL = 'checkout/cancel',

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
  DELIVERY_PARTNERS = 'delivery-partners',
}

export const AppPaths = {
  login: `/${Routes.AUTH}/${Pages.LOGIN}`,
  register: `/${Routes.AUTH}/${Pages.REGISTER}`,

  deliveryLogin: `/${Routes.DELIVERY}/${Routes.AUTH}/${Pages.LOGIN}`,
  deliveryRegister: `/${Routes.DELIVERY}/${Routes.AUTH}/${Pages.REGISTER}`,
} as const;

export enum Query_Keys {
  CATEGORIES = 'Categories',
  CATEGORIES_PRODUCTS = 'CategoriesWith_Products',
  PRODUCT = 'Product',
  CURRENT_USER = 'CurrentUser',
  SIZES = 'Sizes',
  EXTRAS = 'Extras',
  CATEGORY = 'Category',
  ADMIN_USERS = 'AdminUsers',
  ADMIN_USER = 'AdminUser',
  CATEGORY_OPTIONS = 'CategoryOptions',
  PRODUCTS = 'Products',
  ADMIN_PRODUCTS = 'AdminProducts',
  MY_ORDERS = 'MyOrders',
  MY_ORDER = 'MyOrder',
  CURRENT_DELIVERY = 'CurrentDelivery',
  DELIVERY_ORDERS = 'Delivery_Orders',
  ADMIN_DELIVERY_PARTNERS = 'Delivery_Partners',
  ADMIN_ACTIVE_DELIVERY_PARTNERS = 'ACTIVE_Delivery_Partners',
  ADMIN_ORDERS = 'AdminOrders',
  CHECKOUT_SUCCESS = 'CheckoutSuccess',
  BEST_SELLER = 'BestSeller',
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
  PRODUCT_UPDATED = 'Product updated successfully. 🎉',
  PARTNER_ADDED = 'Partner added successfully. 🎉',
  ORDER_ASSIGNED = 'Delivery partner assigned successfully. 🎉',
  ORDER_DELIVERED = 'Order delivered successfully. 🎉',
  ORDER_CANCELED = 'Order canceled successfully.',
}
