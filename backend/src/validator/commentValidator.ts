import { body, check } from "express-validator";
import validatorMidleware from "../middlewares/validator/validatorMidleware";
import { Comment } from "../models/commentModel";
import { Post } from "../models/postModel";
import { User } from "../models/userModel";

export const getCommentValidator = [
  check("id").isMongoId().withMessage("commentId is not valid"),
  validatorMidleware,
];
export const addCommentValidator = [
  body("userId")
    .isMongoId()
    .withMessage("userId is not valid")
    .notEmpty()
    .withMessage("userId is required")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ _id: value });
      if (!user) {
        throw Error(`no document to this user Id ${value}`);
      }
      return true;
    }),
  body("postId")
    .isMongoId()
    .withMessage("postId is not valid")
    .notEmpty()
    .withMessage("postId is required")
    .custom(async (value, { req }) => {
      const post = await Post.findOne({ _id: value });
      if (!post) {
        throw Error(`no document to this post Id ${value}`);
      }
      return true;
    }),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("text is required")
    .isLength({ max: 255 })
    .withMessage("text is too large"),
  validatorMidleware,
];
export const updateCommentValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];
export const removeCommentValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];
