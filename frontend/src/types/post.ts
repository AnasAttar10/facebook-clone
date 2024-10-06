import { TComment } from "./comment";
import { TReaction } from "./reaction";

export type TPost = {
  folder?: string;
  _id: string;
  userId: string;
  text?: string;
  isliked: boolean;
  imgs?: string[];
  reactions: TReaction[];
  comments: TComment[];
};

export type TPostResponse = Omit<TPost, "_id">;
