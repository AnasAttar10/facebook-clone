import express from "express";
import { login, signUp } from "../controllers/authController";
import { loginValidator, signUpValidator } from "../validator/authValidator";
const route = express.Router();
route.post("/signup", signUpValidator, signUp);
route.post("/login", loginValidator, login);
export default route;
