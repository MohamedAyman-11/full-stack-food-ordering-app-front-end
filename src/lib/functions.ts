import axios from 'axios';
import { CircleCheckBig, Ellipse, PackageCheck, Truck } from 'lucide-react';

export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const axiosErrorHandler = (error: unknown) => {
  return axios.isAxiosError(error) ? error.response?.data?.message || error.message : 'An unexpected error occurred';
};

export const getPriceAfterDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

type OrderStatus = 'PLACED' | 'CONFIRMED' | 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export const getOrderStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case 'PLACED':
      return {
        text: 'Placed',
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        bgHover: 'hover:bg-orange-200/80',
      };

    case 'CONFIRMED':
      return {
        text: 'Confirmed',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        bgHover: 'hover:bg-blue-200/80',
      };

    case 'ASSIGNED':
      return {
        text: 'Assigned',
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        bgHover: 'hover:bg-purple-200/80',
      };

    case 'PACKED':
      return {
        text: 'Packed',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        bgHover: 'hover:bg-yellow-200/80',
      };

    case 'OUT_FOR_DELIVERY':
      return {
        text: 'Out for delivery',
        color: 'text-indigo-600',
        bg: 'bg-indigo-100',
        bgHover: 'hover:bg-indigo-200/80',
      };

    case 'DELIVERED':
      return {
        text: 'Delivered',
        color: 'text-green-600',
        bg: 'bg-green-100',
        bgHover: 'hover:bg-green-200/80',
      };
    case 'CANCELLED':
      return {
        text: 'Cancelled',
        color: 'text-red-600',
        bg: 'bg-red-100',
        bgHover: 'hover:bg-red-200/80',
      };

    default:
      return {
        text: status,
        color: 'text-gray-600',
        bg: 'bg-gray-100',
        bgHover: 'hover:bg-gray-200/80',
      };
  }
};

type DeliveryOrderStatus = 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
export const getDeliveryOrderStatusStyle = (status: DeliveryOrderStatus) => {
  switch (status) {
    case 'ASSIGNED':
      return {
        text: 'Mark Packed',
        textColor: 'text-blue-600',
        bg: 'bg-blue-100',
        bgHover: 'hover:bg-blue-100/80',
        icon: PackageCheck,
      };

    case 'PACKED':
      return {
        text: 'Out for Delivery',
        textColor: 'text-purple-600',
        bg: 'bg-purple-100',
        bgHover: 'hover:bg-purple-100/80',
        icon: Truck,
      };

    case 'OUT_FOR_DELIVERY':
      return {
        text: 'Mark Delivered',
        textColor: 'text-green-600',
        bg: 'bg-green-100',
        bgHover: 'hover:bg-green-100/80',
        icon: CircleCheckBig,
      };

    default:
      return {
        text: status,
        textColor: 'text-gray-600',
        bg: 'bg-gray-100',
        bgHover: 'bg-gray-100',
        icon: Ellipse,
      };
  }
};
