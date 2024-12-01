import { check } from "express-validator";
import validatorMidleware from "../middlewares/validator/validatorMidleware";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
export const getUserValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];

export const addNewUserValidator = [
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
    .withMessage("email is not email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("the password  is too small"),

  validatorMidleware,
];
export const updateUserValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];
export const updateUserImageValidator = [
  check("id")
    .isMongoId()
    .withMessage("id is not valid")
    .custom(async (val, { req }) => {
      req.body.userId = val;
      return true;
    }),
  check("folder").notEmpty().withMessage("folder name is required"),
  validatorMidleware,
];
export const changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmis required "),
  check("currentPassword")
    .notEmpty()
    .withMessage("current password is required "),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .custom(async (val, { req }) => {
      const currentPassword = req.body.currentPassword;
      const passwordConfirm = req.body.passwordConfirm;
      const user = await User.findOne({ _id: req?.params?.id });
      if (!user) {
        throw new Error(`no user to this id ${req.params?.id}`);
      }
      const isCorrect = await bcrypt.compare(currentPassword, user.password);
      if (!isCorrect) throw new Error("Incorrect current password");
      if (val !== passwordConfirm)
        throw new Error("password confirmation incorrect");
      return true;
    }),
  validatorMidleware,
];
export const removeUserValidator = [
  check("id").isMongoId().withMessage("id is not valid"),
  validatorMidleware,
];
