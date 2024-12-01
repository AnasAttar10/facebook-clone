import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

const generateToken = (payload: Types.ObjectId) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
export const signUp = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (body.role) {
      delete body.role;
    }
    const user = await User.create(body);
    if (!user) {
      return next(new ApiError(`error in register the user  `, 400));
    }
    const token = generateToken(user?._id);
    res.status(200).json({ data: user, token });
  }
);

export const login = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new ApiError(`Incorrect email or password `, 401));
    }
    const token = generateToken(user?._id);
    res.status(200).json({ data: user, token });
  }
);

type TDecoded = {
  userId: string;
  iat?: number;
  exp?: number;
};
export const protectRoutes = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if there is a token , then hold it
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(new ApiError(`you are not login , Please login .`, 401));
    // verfiy the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TDecoded;
    // check if there is a user has this token
    const user = await User.findById(decoded?.userId);
    if (!user)
      return next(
        new ApiError(`no user to this token , Please login again . `, 401)
      );

    // check if the user changed the password after creating the token

    if (user.passwordChangedAt) {
      const passwordChangedAt = Math.floor(
        new Date(user.passwordChangedAt).getTime() / 1000
      ); // Convert to UNIX timestamp in seconds

      if (decoded.iat && decoded.iat < passwordChangedAt) {
        return next(
          new ApiError(
            "User recently changed their password. Please login again.",
            401
          )
        );
      }
    }
    req.user = user; // Ensure `req.user` is properly typed
    next();
  }
);
