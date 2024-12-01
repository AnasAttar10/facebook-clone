import { setUser } from "@store/Auth/authSlice";
import { useAppDispatch } from "@store/hooks";
import { useQuery } from "react-query";
import { fetchUserById } from "@services/userApi";

export const useUser = (userId: string) => {
  const dispatch = useAppDispatch();
  return useQuery(["user", userId], () => fetchUserById(userId), {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
  });
};
