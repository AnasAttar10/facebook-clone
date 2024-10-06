import mongoose, { ObjectId, Schema } from "mongoose";

export interface IPost {
  userId: ObjectId | string;
  text: string;
  isliked?: boolean;
  imgs: string[];
  reactions?: mongoose.Schema.Types.ObjectId[];
  comments?: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  isliked: { type: Boolean, required: true, default: false },
  imgs: { type: [String], required: true },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const Post = mongoose.model("Post", postSchema);
