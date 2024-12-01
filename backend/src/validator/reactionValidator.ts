import { check } from "express-validator";
import validatorMidleware from "../middlewares/validator/validatorMidleware";
import { User } from "../models/userModel";
import { Post } from "../models/postModel";

export const getReactionValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];

export const addReactionValidator = [
  check("userId")
    .isMongoId()
    .withMessage("userId is not valid")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: value });
      if (!user) {
        throw Error(`no document to this user Id ${value}`);
      }
      return true;
    }),
  check("postId")
    .isMongoId()
    .withMessage("postId is not valid")
    .custom(async (value, { req }) => {
      const post = await Post.findOne({ _id: value });
      if (!post) {
        throw Error(`no document to this post Id ${value}`);
      }
      return true;
    }),
  check("reactionType")
    .notEmpty()
    .isIn(["liked", "loved", "supported", "funny", "sad", "angry", "surprised"])
    .withMessage("reactionType don't belong to reaction Types groupe "),
  validatorMidleware,
];

export const updateReactionValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  check("reactionType")
    .notEmpty()
    .isIn(["liked", "loved", "supported", "funny", "sad", "angry", "surprised"])
    .withMessage("reactionType don't belong to reaction Types groupe "),
  validatorMidleware,
];

export const removeReactionValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];
