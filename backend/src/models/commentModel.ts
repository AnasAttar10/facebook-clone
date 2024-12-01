import mongoose, { Query, Schema } from "mongoose";
import { IPost } from "./postModel";
export interface IComment {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  text: string;
}
const commentSchema = new Schema<IComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  text: { type: String, required: true },
});

commentSchema.pre<Query<IComment, IComment>>(/^find/, function (next) {
  this.populate({ path: "postId", select: "text -_id" });
  next();
});
export const Comment = mongoose.model<IComment>("Comment", commentSchema);
