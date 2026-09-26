# Craveo — Food Ordering Web App

Craveo is a web-based food ordering application for browsing and customizing menu items, managing orders, and coordinating delivery. It includes dedicated customer, administrator, and delivery partner workflows, connected to an API service.

## Overview

Customers can explore the menu, build a cart, and complete an order with card or cash-on-delivery payment. Administrators manage the menu, customers, orders, and delivery partners, while delivery partners update assigned orders through delivery. This repository contains the React frontend; application data and order operations require the configured backend API.

## Features

### Customer

- Browse the home page, menu, and search results.
- Customize products with available sizes and extras; adjust items in a cart that persists in local storage.
- Register and sign in, including Google sign-in; recover and reset a password.
- Enter delivery details, review an order, and choose card or cash-on-delivery payment.
- View order history and order details; manage account information and password.

### Administrator

- Manage products, categories, sizes, and extras.
- Review and manage customer accounts and orders.
- Add and manage delivery partners, and assign partners to orders.

### Delivery partner

- Sign in to a dedicated delivery area.
- View active or completed orders, update order progress, cancel orders, and mark deliveries complete.

## Tech Stack

- **Application:** React 19, TypeScript, Vite
- **Routing and state:** React Router, Redux Toolkit, React Redux
- **API and server state:** Axios, TanStack Query
- **UI and styling:** Tailwind CSS 4, shadcn/ui, Base UI, Lucide React, Inter Variable
- **Forms and validation:** React Hook Form, Zod, `@hookform/resolvers`
- **Authentication integration:** Google OAuth (`@react-oauth/google`)
- **Development tools:** npm, ESLint

## Architecture

This is a client-side single-page application. React Router maps public and role-protected routes; Axios communicates with the backend, and TanStack Query manages server data and mutations. Redux Toolkit holds cart state, which is persisted in `localStorage`. The source is organized into pages, reusable components, API modules, hooks, and shared app state.
