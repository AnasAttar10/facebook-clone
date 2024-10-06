import { TPost } from "@types";
import axiosInstance from "src/api/axios";

export const uploadImages = async (formData: TPost) => {
  return await axiosInstance.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
