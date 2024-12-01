import { UserDocument } from "../models/userModel"; // Adjust this path to match your User model location

declare global {
  namespace Express {
    interface Request<T = any> {
      user?: UserDocument;
      customParams?: T;
    }
  }
}
