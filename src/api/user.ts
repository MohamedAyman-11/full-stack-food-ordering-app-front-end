import axiosInstance from "@/lib/axios";

export const updateProfile = async (data: FormData) => {
  await axiosInstance.patch("/users/me", data);
};
type ChangePassword = {
  currentPassword: string;
  newPassword: string;
};
export const changePassword = async (passwords: ChangePassword) => {
  await axiosInstance.patch("/users/change-password", passwords);
};
