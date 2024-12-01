import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import styled, { CSSProperties } from "styled-components";

export type FormFieldProps<T extends FieldValues> = {
  type?: string;
  placeholder?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  style?: CSSProperties;
  value?: string;
  valueAsNumber?: boolean;
};
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
`;
const ErrorMessage = styled.p`
  color: red;
`;
const FormField = <T extends FieldValues>({
  name,
  value,
  type,
  register,
  placeholder,
  error,
  style,
}: FormFieldProps<T>) => {
  console.log(error);

  return (
    <div>
      <Input
        style={style}
        type={type}
        value={value}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <ErrorMessage>{error.message} </ErrorMessage>}
    </div>
  );
};

export default FormField;
