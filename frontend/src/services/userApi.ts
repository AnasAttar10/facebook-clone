import { TUser } from "@types";
import axiosInstance from "../api/axios";

export const signUp = async (newUser: TUser) => {
  return await axiosInstance.post("/users/signup", newUser);
};

export const fetchUserById = async (userId: string) => {
  return await axiosInstance.get<TUser>(`/users/${userId}`);
};
