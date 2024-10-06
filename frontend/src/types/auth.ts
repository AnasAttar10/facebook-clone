import { TPost } from "./post";

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay?: string;
  from?: string;
  currentCity?: string;
  status?: "single" | "married";
  posts?: TPost[];
};
