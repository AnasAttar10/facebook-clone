import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser {
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  email: string;
  password: string;
  image?: string;
  coverImage?: string;
  phone?: string;
  active?: boolean;
  images?: string[];
  role: "adimn" | "user";
  passwordChangedAt?: Date;
}
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  coverImage: { type: String, default: "" },
  phone: { type: String, default: "" },
  active: { type: Boolean, default: true },
  images: { type: [String] },
  role: { type: String, default: "user" },
  passwordChangedAt: { type: Date },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
