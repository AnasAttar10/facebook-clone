import { IUser, User } from "../models/userModel";
const getUsers = async () => {
  return await User.find();
};
const insertUser = async (newUser: IUser) => {
  return await User.create(newUser);
};
export default { getUsers, insertUser };
