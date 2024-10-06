import express from "express";
import { addUser, getAllUsers } from "../controllers/userController";

const route = express.Router();

route.get("/", getAllUsers);
// route.post("/", addUser);

export default route;
