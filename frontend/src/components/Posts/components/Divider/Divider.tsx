import styled from "styled-components";
import { mainColor } from "@utils/colors";
type TDivider = { $margin?: string };
const Dividerr = styled.div<TDivider>`
  margin: ${({ $margin }) => $margin ?? "10px 0"};
  border: 1px solid ${mainColor};
`;
const Divider = ({ $margin }: TDivider) => {
  return <Dividerr $margin={$margin} />;
};

export default Divider;
