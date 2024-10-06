import { IReaction, Reaction } from "../models/reactionModel";

const getAllReactions = async () => {
  return await Reaction.find();
};

const getAllReactionsByPostId = async (postId: string) => {
  return await Reaction.find({ postId });
};

const insertReaction = async (newReaction: IReaction) => {
  return await Reaction.create(newReaction);
};
const updateReaction = async (reactionId: string, reactionType: string) => {
  return await Reaction.findByIdAndUpdate(reactionId, {
    reactionType: reactionType,
  });
};
const removeReaction = async (_id: string) => {
  return await Reaction.findByIdAndDelete({ _id });
};
export default {
  getAllReactions,
  getAllReactionsByPostId,
  insertReaction,
  updateReaction,
  removeReaction,
};
