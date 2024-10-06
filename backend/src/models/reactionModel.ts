import mongoose, { Schema } from "mongoose";
export type TReactionType =
  | "liked"
  | "loved"
  | "supported"
  | "funny"
  | "sad"
  | "angry"
  | "surprised";
export interface IReaction {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  reactionType: TReactionType;
}
const reactionSchema = new Schema<IReaction>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  reactionType: {
    type: String,
    enum: ["liked", "loved", "supported", "funny", "sad", "angry", "surprised"],
    required: true,
  },
});

export const Reaction = mongoose.model("Reaction", reactionSchema);
