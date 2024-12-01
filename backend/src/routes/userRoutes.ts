import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  PasswordEncryption,
  saveChangedUserImage,
  updateCoverImageUser,
  updatePersonalImageUser,
  updateUser,
} from "../controllers/userController";
import postRoutes from "../routes/postRoutes";
import {
  addNewUserValidator,
  changeUserPasswordValidator,
  getUserValidator,
  removeUserValidator,
  updateUserImageValidator,
  updateUserValidator,
} from "../validator/userValidator";
import {
  uploadSingleImage,
  uploadSingleToCloudinary,
} from "../middlewares/multer/multer";
const route = express.Router();
// need outside params
route.use("/:userId/posts", postRoutes);

// routes
route.get("/", getAllUsers);
route.get("/:id", getUserValidator, getUser);
route.post("/", addNewUserValidator, addUser);
route.put("/:id", updateUserValidator, updateUser);
route.put(
  "/change-personal-image/:id",
  uploadSingleImage,
  updateUserImageValidator,
  uploadSingleToCloudinary,
  saveChangedUserImage,
  updatePersonalImageUser
);
route.put(
  "/change-cover-image/:id",
  uploadSingleImage,
  updateUserImageValidator,
  uploadSingleToCloudinary,
  updateCoverImageUser
);
route.put(
  "/change-password/:id",
  changeUserPasswordValidator,
  PasswordEncryption,
  updateUser
);
route.delete("/:id", removeUserValidator, deleteUser);

export default route;
