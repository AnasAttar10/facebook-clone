import { NextFunction, Request, Response } from "express";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../services/handlersFactory";
import { User } from "../models/userModel";
import ApiError from "../utils/ApiError";
import bcrypt from "bcrypt";
//midelwares
// @desc : insert the changed images to images array
// @route : Put /users/:id
// @access : private

export const saveChangedUserImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const body = req.body;
  const user = await User.findOne({ _id: id });

  if (!user) {
    next(new ApiError(`no user to this id ${id}`, 400));
  } else if (body.coverImage && user?.coverImage) {
    req.body.images = user?.coverImage;
    updateOne(User, "push", "images");
    next();
  } else if (body.image && user?.image) {
    req.body.images = user?.image;
    updateOne(User, "push", "images");
    next();
  } else {
    next();
  }
};

export const PasswordEncryption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const password = req.body.password;
  const newPass = await bcrypt.hash(password, 8);
  req.body.password = newPass;
  req.body.passwordChangedAt = Date.now();
  next();
};

// routes =>

// @desc : get all users
// @route : Get /users
// @access : public
export const getAllUsers = getAll(User);

// @desc : get a user
// @route : Get /users/:id
// @access : public
export const getUser = getOne(User);

// @desc : create a user
// @route : Post /users/
// @access : private
export const addUser = createOne(User);

// @desc : update a user
// @route : Put /users/:id
// @access : private
export const updateUser = updateOne(User, "set");

// @desc : update the personal image to the user
// @route : Put /users/:id
// @access : private
export const updatePersonalImageUser = updateOne(User, "set", "image");

// @desc : update the cover image to the user
// @route : Put /users/:id
// @access : private
export const updateCoverImageUser = updateOne(User, "set", "coverImage");

// @desc : delete a user
// @route : Delete /users/:id
// @access : private
export const deleteUser = deleteOne(User);
