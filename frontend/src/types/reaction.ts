export type TReactionType =
  | "liked"
  | "loved"
  | "supported"
  | "funny"
  | "sad"
  | "angry"
  | "surprised";

export type TReaction = {
  _id: string;
  userId: string;
  postId: string;
  reactionType: TReactionType;
};
export type TReactionRequest = Omit<TReaction, "_id">;
