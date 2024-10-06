export type TComment = {
  userId: string;
  postId: string;
  text: string;
  _id: string;
};
export type TCommentRequest = Omit<TComment, "_id">;
