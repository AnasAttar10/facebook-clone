import { check } from "express-validator";
import validatorMidleware from "../middlewares/validator/validatorMidleware";
import { User } from "../models/userModel";

export const signUpValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("first name is required ")
    .isLength({ max: 10 })
    .withMessage("the first name  is too large"),
  check("lastName")
    .notEmpty()
    .withMessage("first name is required ")
    .isLength({ max: 10 })
    .withMessage("the last name  is too large"),
  check("birthday")
    .notEmpty()
    .withMessage("birthday is required ")
    .isDate()
    .withMessage("birthday is not date "),
  check("gender")
    .notEmpty()
    .withMessage("gender is required ")
    .isIn(["male", "female"])
    .withMessage("gender don't belong to gender Types groupe "),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not email")
    .custom(async (val, { req }) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error("this E-mail in use ");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("the password  is too small"),
  validatorMidleware,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is not email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("the password  is too small"),
  validatorMidleware,
];
