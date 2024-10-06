import { Request, Response } from "express";
import userService from "../services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export const addUser = async (req: Request, res: Response) => {
  try {
    const inserteedUser = userService.insertUser();
    res.status(201).json(inserteedUser);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
