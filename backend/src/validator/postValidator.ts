import { body, check } from "express-validator";
import validatorMidleware from "../middlewares/validator/validatorMidleware";

export const getPostValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];

export const addNewPostValidator = [
  check("userId").isMongoId().withMessage("userId is not valid"),
  check("text").isLength({ max: 255 }).withMessage("the text is too large"),
  validatorMidleware,
];
export const updatePostValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];
export const removePostValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  body("postId")
    .exists()
    .withMessage("post Id is required in the body ")
    .isMongoId()
    .withMessage("post Id is not valid"),
  validatorMidleware,
];
