import {
  createOne,
  deleteMany,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../services/handlersFactory";
import { Reaction } from "../models/reactionModel";

// midelwares =>

// @desc : it's midelware to remove reactions based on post Id
// @route : Delete /posts/:id
// @access : private
export const deleteReactions = deleteMany(Reaction);

// routes =>

// @desc : get All reactions
// @route : Get /reactions/
// @access : public
export const getAllReactions = getAll(Reaction);

// @desc : get one reaction
// @route : Get /reactions/:id
// @access : public
export const getReaction = getOne(Reaction);

// @desc : insert new reaction
// @route : Post /reactions
// @access : private
export const addReaction = createOne(Reaction);

// @desc : update a reaction
// @route : Put /reactions
// @access : private
export const updateReaction = updateOne(Reaction, "set");

// @desc : remove a comment
// @route : Delete /comments
// @access : private
export const removeReaction = deleteOne(Reaction);
