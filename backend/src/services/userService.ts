import { User } from "../models/userModel";
const getUsers = async () => {
  return await User.find();
};
const insertUser = async () => {
  return await User.create({
    name: "test",
    email: "test@gmail.com",
    password: "1234",
  });
};
export default { getUsers, insertUser };
