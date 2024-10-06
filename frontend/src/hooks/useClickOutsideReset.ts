import { useEffect, useRef } from "react";
type TUseClickOutsideReset = { handleState: () => void };
const useClickOutsideReset = ({ handleState }: TUseClickOutsideReset) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      handleState();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return { componentRef };
};

export default useClickOutsideReset;
