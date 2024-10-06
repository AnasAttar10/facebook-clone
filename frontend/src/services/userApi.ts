import { TUser } from "@types";
import axiosInstance from "../api/axios";

export const fetchUserById = async (userId: string) => {
  return await axiosInstance.get<TUser>(`/users/${userId}`);
};
