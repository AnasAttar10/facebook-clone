import { useState } from "react";
type TLanguages = "ar" | "en" | "unknown";
const useKeyboardLanguage = () => {
  const [keyboardLanguage, setKeyboardLanguage] =
    useState<TLanguages>("unknown");
  const getKeyboardLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the input contains Arabic characters
    if (/[\u0600-\u06FF]/.test(value)) {
      setKeyboardLanguage("ar");
    } else if (/^[A-Za-z0-9]*$/.test(value)) {
      setKeyboardLanguage("en");
    } else {
      setKeyboardLanguage("unknown");
    }
  };
  return { keyboardLanguage, getKeyboardLanguage };
};

export default useKeyboardLanguage;
