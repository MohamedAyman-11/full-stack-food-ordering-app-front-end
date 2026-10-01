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

export const seo = {
  home: {
    title: 'Home',
    description: 'Discover delicious burgers, pizza, pasta, desserts, drinks, and more at Craveo.',
  },

  menu: {
    title: 'Menu',
    description: 'Explore the Craveo menu and discover delicious food, drinks, sides, and more.',
  },

  login: {
    title: 'Login',
    description: 'Login to your Craveo account and start ordering your favorite food.',
  },

  register: {
    title: 'Create Account',
    description: 'Create your Craveo account and enjoy a fast and easy food ordering experience.',
  },

  forgotPassword: {
    title: 'Forgot Password',
    description: 'Reset your Craveo account password and regain access to your account.',
  },

  resetPassword: {
    title: 'Reset Password',
    description: 'Create a new password for your Craveo account.',
  },

  myOrders: {
    title: 'My Orders',
    description: 'View and track your Craveo orders.',
  },

  order: {
    title: 'Order Details',
    description: 'View your Craveo order details and track your order status.',
  },

  cart: {
    title: 'Shopping Cart',
    description: 'Review your selected items and manage your Craveo shopping cart.',
  },

  checkout: {
    title: 'Checkout',
    description: 'Complete your order and provide your delivery and payment details.',
  },

  checkoutSuccess: {
    title: 'Order Confirmed',
    description: 'Your Craveo order has been successfully placed.',
  },

  checkoutCancel: {
    title: 'Checkout Cancelled',
    description: 'Your Craveo checkout was cancelled. You can return to your cart and try again.',
  },

  settings: {
    changeData: {
      title: 'Account Settings',
      description: 'Manage your Craveo account information and personal details.',
    },

    updatePassword: {
      title: 'Update Password',
      description: 'Change your Craveo account password.',
    },
  },

  admin: {
    dashboard: {
      title: 'Admin Dashboard',
      description: 'Manage your Craveo store, products, orders, categories, and delivery partners.',
    },

    products: {
      title: 'Products',
      description: 'Manage Craveo products and their information.',
    },

    createProduct: {
      title: 'Create Product',
      description: 'Add a new product to the Craveo menu.',
    },

    updateProduct: {
      title: 'Update Product',
      description: 'Update product information and options in the Craveo menu.',
    },

    sizes: {
      title: 'Product Sizes',
      description: 'Manage product sizes available in the Craveo menu.',
    },

    extras: {
      title: 'Product Extras',
      description: 'Manage additional options and extras available for Craveo products.',
    },

    categories: {
      title: 'Categories',
      description: 'Manage product categories in the Craveo menu.',
    },

    updateCategory: {
      title: 'Update Category',
      description: 'Update category information in the Craveo menu.',
    },

    deliveryPartners: {
      title: 'Delivery Partners',
      description: 'Manage Craveo delivery partners and their accounts.',
    },

    orders: {
      title: 'Orders',
      description: 'Manage and monitor customer orders in Craveo.',
    },

    users: {
      title: 'Users',
      description: 'Manage Craveo customer accounts and user information.',
    },

    updateUsers: {
      title: 'Update User',
      description: 'Update customer account information and user details.',
    },
  },

  delivery: {
    login: {
      title: 'Delivery Partner Login',
      description: 'Login to your Craveo delivery partner account.',
    },

    activeOrders: {
      title: 'Active Orders',
      description: 'View and manage your active Craveo delivery orders.',
    },

    completedOrders: {
      title: 'Completed Orders',
      description: 'View your completed Craveo delivery orders.',
    },
  },
  searchResults: {
    title: 'Search Results',
    description: 'Find delicious food and drinks from Craveo.',
  },
  pageNotFound: {
    title: 'Page Not Found',
    description: `The page you're looking for doesn't exist or may have been moved. Explore Craveo and discover delicious food delivered to your door.`,
  },
};
