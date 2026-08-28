import type { AxiosError } from "axios";
import axios from "axios";

export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

export const axiosErrorHandler = (error: unknown) => {
  return axios.isAxiosError(error)
    ? error.response?.data?.message || error.message
    : "An unexpected error occurred";
};
