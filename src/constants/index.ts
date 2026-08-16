import type { InputType } from "@/interfaces";

export enum Directions {
  RTL = "rtl",
  LTR = "ltr",
}

export enum Languages {
  ENGLISH = "en",
  ARABIC = "ar",
}

export enum Routes {
  ROOT = "/",
  MENU = "menu",
  ABOUT = "about",
  CONTACT = "contact",
  AUTH = "auth",
  CART = "cart",
  PROFILE = "profile",
  ADMIN = "admin",
}

export enum Pages {
  LOGIN = "signin",
  Register = "signup",
  FORGOT_PASSWORD = "forgot-password",
  RESET_PASSWORD = "reset-password",
  CATEGORIES = "categories",
  MENU_ITEMS = "menu-items",
  USERS = "users",
  ORDERS = "orders",
  NEW = "new",
  EDIT = "edit",
  ABOUT = "about",
  CONTACT = "contact",
}
export enum Query_Keys {
  CATEGORIES = "Categories",
  CATEGORIES_PRODUCTS = "Categories_WITH_PRODUCTS",
  PRODUCT = "Product",
}
export enum Messages {
  ADDED_TO_CART = "Product added to cart successfully.",
  QUANTITY_UPDATED = "Product quantity updated successfully.",
}
export const CheckoutInputs: InputType[] = [
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "Governorate",
    name: "governorate",
    placeholder: "Enter your governorate",
  },
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "City",
    name: "city",
    placeholder: "Enter your city",
  },
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "Area",
    name: "area",
    placeholder: "Enter your area",
  },
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "Street",
    name: "street",
    placeholder: "Enter your street",
  },
  {
    id: crypto.randomUUID(),
    type: "number",
    label: "Building Number",
    name: "buildingNumber",
    placeholder: "Enter building number",
  },
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "Apartment",
    name: "apartment",
    placeholder: "Enter apartment number",
  },
  {
    id: crypto.randomUUID(),
    type: "text",
    label: "Floor",
    name: "floor",
    placeholder: "Enter floor number",
  },
];
