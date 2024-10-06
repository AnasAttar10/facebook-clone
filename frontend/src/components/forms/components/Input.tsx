import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 400px;
  border: 1px solid red;
`;
const Lable = styled.p`
  margin: 0;
`;
const InputForm = styled.input`
  width: 60%;
  &.placeholder {
    color: red;
  }
`;
const Input = () => {
  return (
    <Wrapper>
      <Lable>Anas Isam Attar</Lable>
      <InputForm placeholder="what do you think ? "></InputForm>
    </Wrapper>
  );
};

export default Input;
