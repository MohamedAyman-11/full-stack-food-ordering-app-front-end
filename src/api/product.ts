import { axiosInstance } from '@/lib/axios';

export const getProduct = async (id: string) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data.data.product;
};

type ProductParams = {
  categories?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
};

export const getProducts = async ({ categories, search, minPrice, maxPrice, sort, page }: ProductParams) => {
  const params = {
    ...(categories && categories !== 'all' && { categories }),
    ...(search && { search }),
    ...(minPrice !== undefined && { minPrice }),
    ...(maxPrice !== undefined && { maxPrice }),
    sort,
    page,
  };
  const { data } = await axiosInstance.get(`/products`, { params });
  return data.data;
};

export const createProduct = async (data: FormData) => {
  await axiosInstance.post(`/products`, data);
};

type UpdateProduct = {
  data: FormData;
  id: string;
};

export const updateProduct = async ({ data, id }: UpdateProduct) => {
  await axiosInstance.patch(`/products/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  await axiosInstance.delete(`/products/${id}`);
};

export const getBestSellerProducts = async () => {
  const { data } = await axiosInstance.get('/products/best-seller');
  return data.data.products;
};
