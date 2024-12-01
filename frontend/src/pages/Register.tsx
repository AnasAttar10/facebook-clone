import FormField from "@components/forms/components/FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpSchema } from "@validations/signUpSchema";
import Divider from "@components/Posts/components/Divider/Divider";
import { FlexWrapper } from "@components/index";
import useSignUp from "@hooks/apis/user/useSignUp";
import { mainColor } from "@utils/colors";
import { Link } from "react-router-dom";
const Wrapper = styled.div`
  background-color: ${mainColor};
  height: 100%;
`;
const FacebookTilte = styled.h1`
  color: blue;
  font-size: 50px;
  margin: 0;
  padding: 20px;
  text-align: center;
`;
const Form = styled.form`
  width: 30%;
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  text-align: center;
  background-color: white;
`;
const Heading = styled.h2`
  margin: 10px;
`;
const Description = styled.p`
  color: gray;
  margin: 0;
`;
const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SubmitButton = styled.button`
  border: none;
  background-color: green;
  border-radius: 5px;
  color: white;
  padding: 20px 20px;
  cursor: pointer;
  font-size: 18px;
`;
const LoginLink = styled(Link)`
  color: blue;
`;
const InputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid gray",
  borderRadius: "5px",
  fontSize: "14px",
};
const Register = () => {
  const { mutate } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    mutate(data);
  };
  return (
    <Wrapper>
      <FacebookTilte>facebook</FacebookTilte>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Create a new account</Heading>
        <Description>It’s quick and easy.</Description>
        <Divider />
        <InputsWrapper>
          <FlexWrapper $gap="20px">
            <FormField
              name="firstName"
              placeholder="first name"
              type="text"
              style={InputStyle}
              register={register}
              error={errors.firstName}
            />

            <FormField
              name="lastName"
              placeholder="last name"
              type="text"
              style={InputStyle}
              register={register}
              error={errors.lastName}
            />
          </FlexWrapper>
          <Description>Birthday : </Description>

          <FormField
            name="birthday"
            type="date"
            style={InputStyle}
            register={register}
            error={errors.birthday}
          />

          <Description>Gender : </Description>
          <FlexWrapper $gap="10px">
            <div style={InputStyle}>
              <FlexWrapper $xposition="center" $gap="10px">
                <Description>male</Description>
                <div>
                  <FormField
                    name="gender"
                    type="radio"
                    value="male"
                    register={register}
                    error={errors.gender}
                  />
                </div>
              </FlexWrapper>
            </div>
            <div style={InputStyle}>
              <FlexWrapper $xposition="center" $gap="10px">
                <Description>female</Description>
                <div>
                  <FormField
                    name="gender"
                    type="radio"
                    value="female"
                    register={register}
                    error={errors.gender}
                  />
                </div>
              </FlexWrapper>
            </div>
          </FlexWrapper>

          <FormField
            name="email"
            type="email"
            style={InputStyle}
            placeholder="email"
            register={register}
            error={errors.email}
          />

          <FormField
            name="password"
            type="password"
            placeholder="password"
            style={InputStyle}
            register={register}
            error={errors.password}
          />

          <FormField
            name="confirmPassword"
            placeholder="confirmPassword"
            type="password"
            style={InputStyle}
            register={register}
            error={errors.confirmPassword}
          />

          <SubmitButton>Submit</SubmitButton>
          <LoginLink to={"/login"}>Already have an account?</LoginLink>
        </InputsWrapper>
      </Form>
    </Wrapper>
  );
};

export default Register;
