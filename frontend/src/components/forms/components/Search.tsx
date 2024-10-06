import Icon from "@components/Common/Icon/Icon";
import useClickOutsideReset from "@hooks/useClickOutsideReset";
import useKeyboardLanguage from "@hooks/useKeyboardLanguage";
import { useState } from "react";
import styled from "styled-components";
type TSearch = {
  lable?: string;
  type?: string;
  placeholder?: string;
  $showSearchIcon?: boolean;
};
const Wrapper = styled.div`
  position: relative;
`;
const FormGroup = styled.div``;
const FormLable = styled.div``;
const FormControl = styled.input``;
const IconWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
`;
const Search = ({
  lable,
  type = "text",
  placeholder,
  $showSearchIcon = true,
}: TSearch) => {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { keyboardLanguage, getKeyboardLanguage } = useKeyboardLanguage();
  const handleState = () => {
    setIsFocus(false);
  };
  const { componentRef } = useClickOutsideReset({ handleState });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    getKeyboardLanguage(e);
    setInputValue(value);
  };

  return (
    <Wrapper onClick={() => setIsFocus(true)} ref={componentRef}>
      <FormGroup>
        {lable && <FormLable>{lable}</FormLable>}
        <FormControl
          className="border-0"
          type={type}
          placeholder={placeholder ?? ""}
          style={{
            backgroundColor: "#F0F2F5",
            border: "none",
            padding: "12px 30px",
            borderRadius: "30px",
            outline: "none",
            fontSize: "16px",
            direction: keyboardLanguage === "ar" ? "rtl" : "ltr",
          }}
          onChange={handleChange}
          value={inputValue}
          name="searchValue"
        />
        {$showSearchIcon && !isFocus && (
          <IconWrapper>
            <Icon
              icon="search"
              size="1x"
              color="gray"
              $bg="#F0F2F5"
              $bghover="#F0F2F5"
            />
          </IconWrapper>
        )}
      </FormGroup>
    </Wrapper>
  );
};

export default Search;
