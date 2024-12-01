import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TSignInSchema } from "@validations/signInSchema";
import FormField from "@components/forms/components/FormField";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@components/Posts/components/Divider/Divider";
import { mainColor } from "@utils/colors";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: calc(100vh - 55px);
  background-color: ${mainColor};
`;
const LogoContainer = styled.div`
  width: 40%;
`;
const Form = styled.form`
  padding: 10px;
  background-color: white;
  width: 25%;
  border-radius: 10px;
`;
const SubmitButton = styled.button`
  border: none;
  background-color: blue;
  border-radius: 5px;
  color: white;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 18px;
  margin: 10px 0;
  width: 100%;
`;
const CreateNewAccount = styled.button`
  border: none;
  background-color: green;
  border-radius: 5px;
  color: white;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 18px;
  display: block;
  width: 60%;
  margin: 10px auto;
`;
const Heading = styled.h1`
  color: blue;
  font-size: 50px;
  margin: 0;
  margin-bottom: 20px;
`;
const Description = styled.p`
  margin: 0;
  font-size: 25px;
`;
const ForgotPassword = styled(Link)`
  color: blue;
  text-align: center;
  display: block;
  margin: 5px 0;
`;
const InputStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px 0",
  border: "1px solid gray",
  borderRadius: "5px",
  fontSize: "16px",
};
const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });
  const onsubmit: SubmitHandler<TSignInSchema> = async (data) => {
    console.log(data);
  };
  return (
    <Wrapper>
      <LogoContainer>
        <Heading>facebook</Heading>
        <Description>
          Connect with friends and the world around you on Facebook.
        </Description>
      </LogoContainer>
      <Form onSubmit={handleSubmit(onsubmit)}>
        <FormField
          name="email"
          style={InputStyle}
          register={register}
          placeholder="Email"
          error={errors.email}
        />
        <FormField
          name="password"
          register={register}
          style={InputStyle}
          placeholder="Password"
          type="password"
          error={errors.password}
        />
        <SubmitButton>Login</SubmitButton>
        <ForgotPassword to={"/"}>Forgot Password</ForgotPassword>
        <Divider />
        <CreateNewAccount onClick={() => navigate("/register")}>
          Create new account{" "}
        </CreateNewAccount>
      </Form>
    </Wrapper>
  );
};

export default Login;
