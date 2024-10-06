import mongoose, { Schema } from "mongoose";
export interface IComment {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  text: string;
}
const commentSchema = new Schema<IComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
