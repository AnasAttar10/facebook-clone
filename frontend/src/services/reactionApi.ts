import axiosInstance from "../api/axios";
import { TReactionRequest } from "@types";

export const addNewReaction = async (newReaction: TReactionRequest) => {
  return (
    await axiosInstance.post("/reactions", newReaction, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).data;
};

export const updateReaction = async (
  reactionId: string,
  reactionType: string
) => {
  return (
    await axiosInstance.put(`/reactions/${reactionId}`, reactionType, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).data;
};

export const removeReaction = async (reactionId: string) => {
  return (await axiosInstance.delete(`/reactions/${reactionId}`)).data._id;
};
