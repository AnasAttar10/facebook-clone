import { signUp } from "@services/userApi";
import { useMutation } from "react-query";

const useSignUp = () => {
  return useMutation(signUp);
};

export default useSignUp;
